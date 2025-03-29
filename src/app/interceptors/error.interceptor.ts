import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

export function ErrorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const alertService = inject(AlertService);
  return next(request).pipe(
    catchError((err) => {
      if (err) {
        alertService.error(err.error.message);
      }
      return throwError(() => err);
    })
  );
}
