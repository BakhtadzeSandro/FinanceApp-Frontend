import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { anonymGuard } from './guards/anonym.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [anonymGuard],
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/main/main.routes').then((m) => m.mainRoutes),
  },
];
