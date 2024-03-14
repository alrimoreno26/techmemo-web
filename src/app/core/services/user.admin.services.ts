import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './abstract.services';
import {buildURL, buildUsersURL} from '../util';
import {GeneratePassword, User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class UserAdminServices extends AbstractService<User> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, buildUsersURL('/users'));
  }

  /**
   * Enabled or disable user
   * @param id number
   */
  enableOrDisable(id: number): Observable<User> {
    return this.httpClient.put<User>(`${this.basePath}/enable/${id}`, {});
  }

  /**
   * Reset for all user the questions
   */
  resetRating(): Observable<any> {
    return this.httpClient.put<any>(`${this.basePath}/enable_rate`, {});
  }

  /**
   * Generate new password for one user
   * @param data {@link GeneratePassword}
   */
  generatePassword(data: GeneratePassword): Observable<any> {
    return this.httpClient.put<any>(`${this.basePath}/reset_password`, data);
  }
}

