import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function withCredentialsInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  return next(request.clone({ withCredentials: true }));
}
