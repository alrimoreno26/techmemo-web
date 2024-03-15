import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionServices} from '../injects/session.services';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionServices) {
  }

  /**
   * Intercept all HTTP Calls and if has logged token and request url belongs to
   * the API server is add the Authorization token
   * @param request HttpRequest<any>
   * @param next HttpHandler
   * @return An Observable for HttpEvent
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.sessionService.isLoggedIn && this.sessionService.getAccessToken();
    const isApiUrl = request.url.startsWith(environment.apiUsers) ||
      request.url.startsWith(environment.apiURL) ||
      request.url.startsWith(environment.apiOrders);
    const isNotRefresh = request.url.includes('/auth/refresh_token');
    if (isLoggedIn && isApiUrl && !isNotRefresh) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.sessionService.getAccessToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
