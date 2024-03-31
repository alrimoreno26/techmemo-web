import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of, tap} from 'rxjs';
import {SessionServices} from '../injects/session.services';
import {buildURL, getCookie} from './index';
import {ACCESS_TOKEN} from "../enums/role";

/**
 * This function load the current profile every time the app is load
 * @param httpClient {@link HttpClient}
 * @param session {@link SessionServices}
 * @return An Observable
 */
export function initializeAppFactory(httpClient: HttpClient, session: SessionServices): () => Observable<any> {
  const token = getCookie(ACCESS_TOKEN);
  if (token !== '') {
    session.setAccessToken(token);
    return () => httpClient.get(
        buildURL('/v1/users/authenticated'),
      {headers: {Authorization: `Bearer ${token}`}})
      .pipe(tap(user => session.updateUser(user)));
  }
  return () => of(EMPTY);
}

