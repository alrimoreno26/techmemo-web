import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './abstract.services';
import {buildURL} from '../util';
import {GeneratePassword, User} from "../models";
import {LazyResultData} from "../../standalone/data-table/models";

@Injectable({
  providedIn: 'root'
})
export class UserAdminServices extends AbstractService<User> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, buildURL('/v1/users'));
  }

  /**
   * Enabled or disable user
   * @param id number
   */
  enableOrDisable(id: number): Observable<User> {
    return this.httpClient.put<User>(`${this.basePath}/enable/${id}`, {});
  }

    /**
     * Enabled or disable user
     * @param queryParams
     */
    loadBasic(queryParams: any): Observable<LazyResultData<User>> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.client.get<LazyResultData<User>>(`${this.basePath}/basic-information`, {params});
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

