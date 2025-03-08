import {
  Component,
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
  LoginForm,
  RegisterForm,
  RegisterPayload,
} from '../../auth.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule, IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../../services/auth.service';
import { finalize, Subject, takeUntil } from 'rxjs';

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
})
export class RegisterComponent {
  destroy$ = new Subject<void>();
  pageMode = output<PageMode>();
  registerForm = signal<FormGroup<RegisterForm> | undefined>(undefined);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

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

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
