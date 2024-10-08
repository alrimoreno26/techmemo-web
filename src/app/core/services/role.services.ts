import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorityTO, Role} from '../models';
import {AbstractService} from './abstract.services';
import {buildURL} from '../util';
import {LazyLoadData} from "../../standalone/data-table/models";

@Injectable({
  providedIn: 'root'
})
export class RoleServices extends AbstractService<Role> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, buildURL('/v1/roles'));
  }

  getAllAuthority(data: LazyLoadData | Partial<LazyLoadData>): Observable<AuthorityTO[]> {
      const params: HttpParams = new HttpParams({fromObject: data as any});
    return this.client.get<AuthorityTO[]>(buildURL(`/v1/authorities?${params}`));
  }
}

