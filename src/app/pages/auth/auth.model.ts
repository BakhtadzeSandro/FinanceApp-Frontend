import { FormControl } from '@angular/forms';

export interface LoginForm {
  username: FormControl<string | undefined>;
  password: FormControl<string | undefined>;
}

export interface RegisterForm {
  firstName: FormControl<string | undefined>;
  lastName: FormControl<string | undefined>;
  username: FormControl<string | undefined>;
  email: FormControl<string | undefined>;
  password: FormControl<string | undefined>;
}

export enum PageMode {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
