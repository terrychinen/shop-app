import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(newReq);
}
