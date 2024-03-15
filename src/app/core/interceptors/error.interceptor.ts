import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, finalize, Observable, switchMap, throwError} from 'rxjs';
import {catchError, filter, take} from 'rxjs/operators';
import {MessageServices} from '../injects/message.services';
import {SessionServices} from "../injects/session.services";
import {AuthServices} from "../services/auth.services";
import {RefreshTokenTO} from "../models/user";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Controls refresh token
   * @private isRefreshing boolean default value false
   */
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router,
              private readonly injector: Injector,
              private sessionService: SessionServices,
              private authServices: AuthServices,
              private messageService: MessageServices) {
  }

  /**
   * Intercept all HTTP Errors, and if the request is Unauthenticated then send a Refresh Token API Call
   * @param request HttpRequest<any>
   * @param next HttpHandler
   * @return An Observable for HttpEvent
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        /**
         * Switch for the error in the api response
         */
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 0:
              this.getErrorFromApi('networkError.code500');
              break;
            case 400:
              this.getErrorFromApi('networkError.code400', error?.error?.message);
              break;
            case 401:
              if (this.refreshTokenInProgress) {    // If the refresh token is in progress, wait for the new token
                if (error.url?.includes('refresh_token')) {
                  this.refreshTokenInProgress = false;
                  this.sessionService.clearSession();
                  this.getErrorFromApi('networkError.code401');
                  return throwError(error.message);
                }
                return this.refreshTokenSubject.pipe(
                  filter((result) => result !== null),
                  take(1),
                  switchMap(() => next.handle(this.addAuthToken(request)))
                );
              } else {
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);
                this.sessionService.setAccessToken(null);
                /**
                 * Send to refresh token when error code is 401
                 */
                return this.authServices.refreshToken(this.sessionService.getRefreshToken())
                  .pipe(
                    switchMap((resp: RefreshTokenTO) => {
                      /**
                       * Set isRefreshing in false
                       * Set sessionService token and refreshToken
                       * Set the new token to hold request and fail
                       */
                      this.refreshTokenSubject.next(resp.token);
                      this.sessionService.setAccessToken(resp.token);
                      this.sessionService.setRefreshToken(resp.refreshToken);
                      return next.handle(request.clone({
                        setHeaders: {
                          Authorization: `Bearer ${resp.token}`
                        }
                      }));
                    }),
                    finalize(() => (this.refreshTokenInProgress = false)),
                    catchError((err) => {
                      /**
                       * This method dispatch when refreshToken is expired
                       * Set isRefreshing in false
                       * Clear the sessionService and redirect to the login page
                       */
                      this.refreshTokenInProgress = false;
                      this.sessionService.clearSession();
                      this.getErrorFromApi('networkError.code401');
                      return throwError(err.message);
                    })
                  );
              }
            case 403:
              this.router.navigate(['/static/access-denied']).then();
              this.getErrorFromApi('networkError.code403');
              break;
            case 405:
              this.getErrorFromApi('networkError.code405', error?.error?.message);
              break;
            case 415:
              this.getErrorFromApi('networkError.code415', error?.error?.message);
              break;
            case 422:
              this.getErrorFromApi('networkError.code422', error?.error?.details[0]);
              break;
            case 500:
              this.router.navigate(['/static/error']).then();
              this.getErrorFromApi('networkError.code500');
              break;
            case 503:
              this.router.navigate(['/static/error']).then();
              this.getErrorFromApi('networkError.code503', error?.error?.message);
              break;
            default:
              /**
               * Prints the unknown error for further treatment
               */
              this.getErrorFromApi('networkError.code0');
              break;
          }
        }
        return throwError(error);
      }));
  }

  addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.refreshTokenSubject.getValue();
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Fires the corresponding error message for the error returned by the api
   * @param error string
   * @param message string
   */
  private getErrorFromApi(error: string, message?: string): void {
    try {
      const translateService = this.injector.get(TranslateService);
      message ?
        this.messageService.addError(message) :
        this.messageService.addError(translateService.instant(error));
    } catch (e) {
      console.error('Load TranslateService');
    }
  }
}
