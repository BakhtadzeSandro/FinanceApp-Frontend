import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string | undefined>;
  password: FormControl<string | undefined>;
}

export interface RegisterForm {
  name: FormControl<string | undefined>;
  email: FormControl<string | undefined>;
  password: FormControl<string | undefined>;
}

export enum PageMode {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
}
