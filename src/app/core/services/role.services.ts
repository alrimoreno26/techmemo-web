import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorityTO, Role} from '../models';
import {AbstractService} from './abstract.services';
import {buildURL, buildUsersURL} from '../util';

@Injectable({
  providedIn: 'root'
})
export class RoleServices extends AbstractService<Role> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, buildUsersURL('/v1/roles'));
  }

  getAllAuthority(): Observable<AuthorityTO[]> {
    return this.client.get<AuthorityTO[]>(buildUsersURL('/v1/authorities'));
  }
}

