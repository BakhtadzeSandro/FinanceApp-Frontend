import {
  Component,
  ElementRef,
  inject,
  OnInit,
  output,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginForm, LoginPayload, PageMode } from '../../auth.model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit {
  pageMode = output<PageMode>();
  loginForm = signal<FormGroup<LoginForm> | undefined>(undefined);

  fb = inject(FormBuilder);
  authService = inject(AuthService);

  showPassword = signal<boolean>(false);

  @ViewChild('inputPassword') inputPassword!: ElementRef;

  constructor() {}

  private buildForm() {
    const fb = this.fb.nonNullable;
    const form = new FormGroup<LoginForm>({
      username: fb.control(undefined, Validators.required),
      password: fb.control(undefined, Validators.required),
    });
    this.loginForm.set(form);
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
    this.inputPassword.nativeElement.type = this.showPassword()
      ? 'text'
      : 'password';
  }

  login() {
    if (this.loginForm()?.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm()?.value as LoginPayload)
      .subscribe((res) => localStorage.setItem('token', res['access_token']));
  }

  changePageMode() {
    this.pageMode.emit(PageMode.REGISTER);
  }

  ngOnInit() {
    this.buildForm();
  }
}
