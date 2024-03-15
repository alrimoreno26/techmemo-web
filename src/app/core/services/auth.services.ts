import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {silentIt} from '../interceptors/spinner.interceptor';
import {buildURL, buildUsersURL} from '../util';
import {FormAuth, RefreshTokenTO, UserAuthenticated} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  private basePath = buildUsersURL('/v1');

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Login method
   * @param loginForm {@link FormAuth}
   * @return An Observable {@link UserAuthenticated}
   */
  login(loginForm: FormAuth): Observable<UserAuthenticated> {
    return this.httpClient.post<UserAuthenticated>(`${this.basePath}/login`, loginForm);
  }

  /**
   * Get Profile method
   * @return An Observable {@link UserAuthenticated}
   */
  profile(): Observable<UserAuthenticated> {
    return this.httpClient.get<UserAuthenticated>(buildURL('/users/authenticated'));
  }

  /**
   * Refresh token when expire or forced
   * @param param {@link RefreshTokenTO}
   * @return An Observable {@link RefreshTokenTO}
   */
  refreshToken(param: RefreshTokenTO): Observable<RefreshTokenTO> {
    return this.httpClient.post<RefreshTokenTO>(
      `${this.basePath}/refresh_token`, param,
      {context: silentIt()}
    );
  }

  /**
   * Logout from api
   * @return An empty response
   */
  logout(): Observable<any> {
    return this.httpClient.post<any>(
      `${this.basePath}/logout`, {},
      {context: silentIt()}
    );
  }
}
