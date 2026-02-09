import { HttpInterceptorFn } from '@angular/common/http';
import { v4 as uuid } from 'uuid';

export const correlationInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: { 'X-Correlation-Id': uuid() }
  });
  return next(req);
};
