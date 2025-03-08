import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginForm, PageMode } from '../../auth.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginComponent, RegisterComponent } from '../index';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  ReplaySubject,
  Subject,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    IconFieldModule,
    ButtonModule,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
})
export class AuthComponent {
  isLoggingIn = signal<boolean>(true);

  constructor() {}

  pageModeHandler(event: PageMode) {
    this.isLoggingIn.set(event === PageMode.LOGIN);
  }

  login() {}

  ngOnInit() {}
}
