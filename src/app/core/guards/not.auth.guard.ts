import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {SessionServices} from '../injects/session.services';

export const canActivateNotAuthGuard: CanActivateFn = () => {
  return inject(NotAuthGuard).canActivate();
};

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard {
  constructor(private sessionService: SessionServices, private router: Router) {
  }

  /**
   * CanActivate the module if the current user is not logged
   * else navigation redirect user to dashboard
   * @return An boolean value
   */
  canActivate(): boolean {
    if (this.sessionService.isLoggedIn) {
      this.router.navigate(['/']).then();
    }
    return !this.sessionService.isLoggedIn;
  }
}
