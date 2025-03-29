import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from '../../../../services/users.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { AlertService } from '../../../../services/alert.service';

export interface PasswordModalConfig {
  userId: string;
}

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
  styleUrls: ['./password-change-modal.component.scss'],
  imports: [
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  standalone: true,
})
export class PasswordChangeModalComponent implements OnInit {
  destroy$ = new Subject<void>();
  uploadedFile = signal<File | undefined>(undefined);
  oldPasswordIsCorrect = signal<boolean | undefined>(undefined);
  passwordForm = signal(
    new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
    })
  );
  showPassword = signal<boolean>(false);

  private usersService = inject(UsersService);
  private ref = inject(DynamicDialogRef);
  private alertService = inject(AlertService);
  config = inject(DynamicDialogConfig<PasswordModalConfig>);

  @ViewChild('inputPassword') inputPassword!: ElementRef;
  @ViewChild('inputNewPassword') inputNewPassword!: ElementRef;

  constructor() {}

  checkIfPasswordMatches() {
    this.passwordForm()
      .controls.oldPassword.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((val) => this.checkPassword(val!))
      )
      .subscribe((val) => this.oldPasswordIsCorrect.set(val));
  }

  checkPassword(password: string) {
    return this.usersService.checkPassword({ password });
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
    this.inputPassword.nativeElement.type = this.showPassword()
      ? 'text'
      : 'password';
  }

  toggleNewPassword() {
    this.showPassword.set(!this.showPassword());
    this.inputNewPassword.nativeElement.type = this.showPassword()
      ? 'text'
      : 'password';
  }

  updatePassword() {
    const newPassword = this.passwordForm().get('newPassword')?.value;
    if (newPassword) {
      this.usersService
        .updatePassword({ newPassword }, this.config?.data?.userId)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.ref.close())
        )
        .subscribe(() =>
          this.alertService.success('Password Updated Successfully')
        );
    }
  }

  ngOnInit() {
    this.checkIfPasswordMatches();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
