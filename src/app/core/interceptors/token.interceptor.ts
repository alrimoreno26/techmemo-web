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
        const isApiUrl = request.url.startsWith(environment.apiURL)
        const isNotRefresh = request.url.includes('/auth/refresh_token');
        if (isLoggedIn && isApiUrl && !isNotRefresh) {
            const routePattern = /^(?:.*\/)*orders\/([a-zA-Z0-9\-]+)\/products$/;
            const requestToken = (routePattern.test(request.url) && request.method === 'DELETE') ? this.sessionService.getDeleteToken() : this.sessionService.getAccessToken()
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${requestToken}`,
                    'X-Tenant-Id': `${this.sessionService.getTenantId()}`,
                }
            });
        }
        return next.handle(request);
    }
}
