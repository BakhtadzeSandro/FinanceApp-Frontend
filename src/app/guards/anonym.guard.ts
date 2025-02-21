import { CanActivateFn } from '@angular/router';

export const anonymGuard: CanActivateFn = (route, state) => {
  return true;
};
