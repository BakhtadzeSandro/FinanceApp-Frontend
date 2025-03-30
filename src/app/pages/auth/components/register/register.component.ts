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
import {
  PageMode,
  RegisterForm,
  RegisterPayload,
} from '../../../../models/auth.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule, IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../../services/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  finalize,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import * as UC from '@uploadcare/file-uploader';
import '@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css';
import { UsersService } from '../../../../services/users.service';

UC.defineComponents(UC);

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    IconFieldModule,
    IconField,
    InputIcon,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent {
  destroy$ = new Subject<void>();
  pageMode = output<PageMode>();
  registerForm = signal<FormGroup<RegisterForm> | undefined>(undefined);
  uploadedFile = signal<File | undefined>(undefined);
  emailExists = signal<boolean>(false);
  usernameExists = signal<boolean>(false);
  usernameCheckInProgress = signal(false);
  emailCheckInProgress = signal(false);

  @ViewChild('ctxProviderRef', { static: true }) ctxProviderRef!: ElementRef<
    InstanceType<UC.UploadCtxProvider>
  >;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private usersService = inject(UsersService);

  showPassword = signal<boolean>(false);

  @ViewChild('inputPassword') inputPassword!: ElementRef;

  constructor() {}

  private buildForm() {
    const fb = this.fb.nonNullable;
    const form = new FormGroup<RegisterForm>({
      firstName: fb.control(undefined, Validators.required),
      lastName: fb.control(undefined, Validators.required),
      username: fb.control(undefined, Validators.required),
      email: fb.control(undefined, [Validators.required, Validators.email]),
      avatar: fb.control(null),
      password: fb.control(undefined, Validators.required),
    });
    this.registerForm.set(form);
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
    this.inputPassword.nativeElement.type = this.showPassword()
      ? 'text'
      : 'password';
  }

  register() {
    if (this.registerForm()?.invalid) {
      return;
    }

    const payload = this.registerForm()?.value;

    this.authService
      .registerUser(payload as RegisterPayload)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.pageMode.emit(PageMode.LOGIN))
      )
      .subscribe();
  }

  changePageMode() {
    this.pageMode.emit(PageMode.LOGIN);
  }

  handleChangeEvent = (e: UC.EventMap['change']) => {
    this.registerForm()
      ?.get('avatar')
      ?.patchValue(e?.detail?.allEntries[0]?.cdnUrl);
  };

  listenToUsernameChanges() {
    this.registerForm()
      ?.get('username')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((val) => {
          if (val && val !== this.usersService.currentUser()?.username) {
            this.usernameCheckInProgress.set(true);
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
    this.registerForm()
      ?.get('email')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((val) => {
          if (val && val !== this.usersService.currentUser()?.email) {
            this.emailCheckInProgress.set(true);
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
    this.buildForm();
    this.listenToUsernameChanges();
    this.listenToEmailChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
