import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '@app/services/loading.service';

export function LoadingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);
  loadingService.startLoading();

  return next(request).pipe(
    delay(1000),
    finalize(() => loadingService.stopLoading())
  );
}
