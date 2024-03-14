import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot} from '@angular/router';
import {SessionServices} from '../injects/session.services';

export const canMatchAuthGuard: CanMatchFn = (route: Route) => {
  return inject(AuthGuard).canMatch(route);
};

export const canActivateAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate(route, state);
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private sessionService: SessionServices,
              private router: Router) {
  }

  /**
   * CanActivate the module if Authenticated user is isLoggedIn else redirect to login page
   * @param route {@link ActivatedRouteSnapshot}
   * @param state {@link RouterStateSnapshot}
   * @return An boolean value
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.sessionService.isLoggedIn) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
    }
    return this.sessionService.isLoggedIn;
  }

  /**
   * CanLoad the module if Authenticated user is isLoggedIn else redirect to login page
   * @param route {@link Route}
   * @return An boolean value
   */
  canMatch(route: Route): boolean {
    const {pathname, search} = window.location;
    if (!this.sessionService.isLoggedIn) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: pathname + '' + search}}).then();
    }
    return this.sessionService.isLoggedIn;
  }
}
