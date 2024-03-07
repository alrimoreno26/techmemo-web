import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorityTO, Role} from '../models';
import {AbstractService} from './abstract.services';
import {buildURL} from '../util';

@Injectable({
  providedIn: 'root'
})
export class RoleServices extends AbstractService<Role> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, buildURL('/api/role'));
  }

  getAllAuthority(): Observable<AuthorityTO[]> {
    return this.client.get<AuthorityTO[]>(`${this.basePath}/authorities`);
  }
}

