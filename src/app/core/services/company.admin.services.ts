import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {buildURL} from '../util';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminServices {
  private basePath = buildURL('/api/company/admin');

  constructor(private httpClient: HttpClient) {
  }

  companyDelete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.basePath}/company/${id}`);
  }

}
