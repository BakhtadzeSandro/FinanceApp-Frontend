import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';

export function ErrorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const alertService = inject(AlertService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && err.error?.message === 'Unauthorized') {
        localStorage.removeItem('token');
        alertService
          .error('Session expired. Please log in again.')
          .then(() => router.navigate(['/auth']));
      } else if (err.error?.message) {
        alertService.error(err.error.message);
      }

      return throwError(() => err);
    })
  );
}
