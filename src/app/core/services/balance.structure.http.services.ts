import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './abstract.services';
import {buildURL} from "../util";
import {AccountStructureTO, BalanceStructureLightTO} from "../models/bills";


@Injectable({providedIn: 'root'})
export class BalanceStructureHttpServices extends AbstractService<BalanceStructureLightTO> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, buildURL('/v1/balance-structures'));
  }

  patchStructure(id: string, body: Partial<BalanceStructureLightTO>): Observable<any> {
    return this.httpClient.patch(`${this.basePath}/${id}`, body);
  }

  changeState(id: string): Observable<any> {
    return this.httpClient.patch(`${this.basePath}/${id}/enable`, {});
  }

  /************Accounts***********/
  getAccounts(id: string): Observable<AccountStructureTO[]> {
    return this.httpClient.get<AccountStructureTO[]>(`${this.basePath}/${id}/accounts`);
  }

  createAccounts(id: string, body: any[]): Observable<any[]> {
    return this.httpClient.post<any[]>(`${this.basePath}/${id}/accounts`, body);
  }

  /****************Summary*****************/
  getSummary(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.basePath}/${id}/summaries`);
  }

  createSummary(id: string, data: any): Observable<any[]> {
    return this.httpClient.post<any[]>(`${this.basePath}/${id}/summaries`, [data]);
  }

  updateSummary({id, accountStructures}: any): Observable<any> {
    return this.httpClient.put<any>(
      `${this.basePath}/summaries/${id}/accounts`, accountStructures
    );
  }

  deleteSummary(id: number | string): Observable<any> {
    return this.httpClient.delete(`${this.basePath}/summaries/${id}`);
  }

  patchSummary(id: string, body: any): Observable<any> {
    return this.httpClient.patch(`${this.basePath}/summaries/${id}`, body);
  }
}
