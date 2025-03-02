import { Route } from '@angular/router';
import { AuthComponent } from '../auth/components/auth/auth.component';

export const authRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
  },
];
