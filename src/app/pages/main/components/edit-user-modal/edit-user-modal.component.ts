import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import * as UC from '@uploadcare/file-uploader';
import '@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css';
import {
  Subject,
  takeUntil,
  finalize,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  EMPTY,
} from 'rxjs';
import { PageMode, UpdateUserForm } from '@app/models/auth.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { User } from '@app/models/user.model';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { UsersService } from '@app/services/users.service';
import * as _ from 'lodash';
import { PasswordChangeModalComponent } from '../password-change-modal/password-change-modal.component';
import { AlertService } from '@app/services/alert.service';

export interface EditUserConfig {
  userInfo: Partial<User>;
  userId: string;
}

UC.defineComponents(UC);

@Component({
  selector: 'app-edit-user-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    IconFieldModule,
    ButtonModule,
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditUserModalComponent {
  destroy$ = new Subject<void>();
  pageMode = output<PageMode>();
  userForm = signal<FormGroup<UpdateUserForm> | undefined>(undefined);
  emailExists = signal<boolean>(false);
  usernameExists = signal<boolean>(false);
  usernameCheckInProgress = signal(false);
  emailCheckInProgress = signal(false);

  isDataEqualToForm = signal<boolean>(true);

  @ViewChild('ctxProviderRef', { static: true }) ctxProviderRef!: ElementRef<
    InstanceType<UC.UploadCtxProvider>
  >;

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private dialogService = inject(DialogService);
  private ref = inject(DynamicDialogRef);
  private alertService = inject(AlertService);
  config = inject(DynamicDialogConfig<EditUserConfig>);

  constructor() {}

  private buildForm(userInfo: Partial<User>) {
    const fb = this.fb.nonNullable;
    const form = new FormGroup<UpdateUserForm>({
      firstName: fb.control(userInfo.firstName, Validators.required),
      lastName: fb.control(userInfo.lastName, Validators.required),
      username: fb.control(userInfo.username, Validators.required),
      email: fb.control(userInfo.email, [
        Validators.required,
        Validators.email,
      ]),
      avatar: fb.control(userInfo?.avatar ?? null),
    });
    this.userForm.set(form);
  }

  updateUser() {
    if (this.userForm()?.invalid) {
      return;
    }

    const payload = this.userForm()?.value as Partial<User>;

    this.usersService
      .updateUser({ userInfo: payload }, this.config?.data?.userId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.ref.close())
      )
      .subscribe((val) => {
        this.usersService.currentUser.set(val as User);
        this.alertService.success('User Information Updated Successfully');
      });
  }

  handleChangeEvent = (e: UC.EventMap['change']) => {
    this.userForm()
      ?.get('avatar')
      ?.patchValue(e?.detail?.allEntries[0]?.cdnUrl);
  };

  openPasswordChangeModal() {
    this.dialogService.open(PasswordChangeModalComponent, {
      header: 'Change Password',
      showHeader: true,
      closable: true,
      modal: true,
      width: '50vw',
      focusOnShow: false,
      dismissableMask: true,
      breakpoints: {
        '996px': '70vw',
      },
      data: {
        userId: this.config?.data?.userId,
      },
    });
  }

  compareFormToData() {
    this.userForm()
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap((val) =>
          this.isDataEqualToForm.set(
            _.isEqual(val, this.config?.data?.userInfo)
          )
        )
      )
      .subscribe();
  }

  listenToUsernameChanges() {
    this.userForm()
      ?.get('username')
      ?.valueChanges.pipe(
        tap((val) => {
          if (val && val !== this.usersService.currentUser()?.username) {
            this.usernameCheckInProgress.set(true);
          }
        }),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((val) => {
          if (val && val !== this.usersService.currentUser()?.username) {
            return this.usersService
              .checkIfUserExists('username', val)
              .pipe(finalize(() => this.usernameCheckInProgress.set(false)));
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((val) => this.usernameExists.set(val));
  }

  listenToEmailChanges() {
    this.userForm()
      ?.get('email')
      ?.valueChanges.pipe(
        tap((val) => {
          if (val && val !== this.usersService.currentUser()?.email) {
            this.emailCheckInProgress.set(true);
          }
        }),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((val) => {
          if (val && val !== this.usersService.currentUser()?.email) {
            return this.usersService
              .checkIfUserExists('email', val)
              .pipe(finalize(() => this.emailCheckInProgress.set(false)));
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((val) => this.emailExists.set(val));
  }

  ngOnInit() {
    this.ctxProviderRef?.nativeElement?.addEventListener(
      'change',
      this.handleChangeEvent
    );
    this.buildForm(this.config.data?.userInfo);
    this.compareFormToData();
    this.listenToEmailChanges();
    this.listenToUsernameChanges();
  }

  ngOnDestroy() {
    this.ctxProviderRef.nativeElement.removeEventListener(
      'change',
      this.handleChangeEvent
    );
    this.destroy$.next();
    this.destroy$.complete();
  }
}
