import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {flatMap} from 'lodash';
import {environment} from 'src/environments/environment';
import {getCookie, setCookie} from '../util';
import {RefreshTokenTO, UserAuthenticated} from "../models/user";
import {ACCESS_TOKEN, domainEnum, REFRESH_TOKEN} from "../enums/role";
import {PermissionServices} from "./permission.services";

@Injectable({
  providedIn: 'root'
})
export class SessionServices {

  /**
   * isLoggedIn boolean to check logged user
   */
  isLoggedIn = false;
  /**
   * Store the current token init default in null value
   * @private currentToken$ BehaviorSubject<string>
   */
  private currentToken$: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  /**
   * Store the current user authenticated init default null value
   * @private loggedUser$ BehaviorSubject<{@link UserAuthenticated}>
   */
  private loggedUser$: BehaviorSubject<UserAuthenticated> = new BehaviorSubject<any>(null);

  constructor(private router: Router,
              private permissionServices: PermissionServices) {
  }

  /**
   * @return An {@link Observable<UserAuthenticated>}
   */
  get userLogged$(): Observable<UserAuthenticated> {
    return this.loggedUser$.asObservable();
  }

  /**
   * @return An {@link UserAuthenticated} object
   */
  get userLogged(): UserAuthenticated {
    return this.loggedUser$.getValue();
  }

  /**
   * Get from Cookie the Access Token
   * @return An {String} whit access token
   */
  getAccessToken(): string {
    return this.currentToken$.getValue();
  }

  getAccessToken$(): Observable<string> {
    return this.currentToken$.asObservable();
  }

  /**
   * Get from Cookie Token and Refresh Token
   * @return An {@link RefreshTokenTO} width current values
   */
  getRefreshToken(): RefreshTokenTO {
    return {
      token: getCookie(ACCESS_TOKEN),
      refreshToken: getCookie(REFRESH_TOKEN)
    };
  }

  /**
   * Method set user value from auth
   * @param user {@link UserAuthenticated}
   * @return void
   */
  setUserLogged(user: UserAuthenticated): void {
    this.isLoggedIn = true;
    this.setAccessToken(user.token);
    this.setRefreshToken(user.refreshToken);
    this.addBasicInfo(user);
  }

  /**
   * Set the new token access to the session and stored cookie
   * @param token string
   */
  setAccessToken(token: string | null): void {
    if (token) {
      this.currentToken$.next(token);
      setCookie(ACCESS_TOKEN, token);
    }
  }

  /**
   * Set the new token and refresh to the session and stored cookie
   * @param refresh string
   */
  setRefreshToken(refresh: string | null): void {
    if (refresh) {
      setCookie(REFRESH_TOKEN, refresh);
    }
  }

  /**
   * Check if current user has access by role
   * @param roles {@link Array<domainEnum>}
   * @return An boolean value
   */
  roleAccess(roles: Array<domainEnum> = []): boolean {
    const list = flatMap(roles.map(r => this.userLogged.role.authorities.filter(f => f.domainDetail.domain === r)));
    this.permissionServices.setAuthorityList(list, roles[0]);

    /**
     * Parch for develop only
     */
    if (roles[0] === domainEnum.ALL && !environment.production) {
      return true;
    }
    return list.length > 0;
  }

  /**
   * Update the current user
   * @param user {@link UserAuthenticated}
   */
  updateUser(user: UserAuthenticated | any): void {
    this.isLoggedIn = true;
    this.addBasicInfo(user);
  }

  /**
   * Clear the session and store cookie
   */
  clearSession(): void {
    this.isLoggedIn = false;
    this.currentToken$.complete();
    this.loggedUser$.complete();
    setCookie(REFRESH_TOKEN, '', 5);
    setCookie(ACCESS_TOKEN, '', 5);
    this.router.navigate(['/login']).then(() => {
        document.location.reload();
      }
    );
  }

  /**
   *  Set Basic Info for Permission use
   * @param user {@link UserAuthenticated}
   */
  private addBasicInfo(user: UserAuthenticated): void {
    user = {...user, organizationId: '00000000000'};
    this.loggedUser$.next(user);
    this.permissionServices.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roleName: user.role.name,
      cpf: user.cpf
    });
  }
}