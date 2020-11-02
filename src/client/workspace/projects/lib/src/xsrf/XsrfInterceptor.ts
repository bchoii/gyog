import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`XsrfInterceptor`);
    const cookies = Object.fromEntries(
      document.cookie.split(';').map((p) => p.split('=').map((x) => x.trim()))
    );
    const xsrf = cookies['XSRF-TOKEN'] || '';
    console.log('xsrf', xsrf);
    request = request.clone({
      setHeaders: { 'x-xsrf-token': xsrf },
    });
    return next.handle(request);
  }
}
