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
import { LoginForm, PageMode } from '../../auth.model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';

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

  showPassword = signal<boolean>(false);

  @ViewChild('inputPassword') inputPassword!: ElementRef;

  constructor() {}

  private buildForm() {
    const fb = this.fb.nonNullable;
    const form = new FormGroup<LoginForm>({
      email: fb.control(undefined, [Validators.required, Validators.email]),
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
    console.log(this.loginForm()?.value);
  }

  changePageMode() {
    this.pageMode.emit(PageMode.REGISTER);
  }

  ngOnInit() {
    this.buildForm();
  }
}
