import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {buildURL} from "../util";
import {silentIt} from "../interceptors/spinner.interceptor";

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionsService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/financial-transactions'));
    }

    updateFinancialTransactions(params: any, id: string): Observable<any> {
        return this.httpClient.patch<any>(`${this.basePath}/${id}`, params, {context: silentIt()});

    }

    createInstallmentsByFinancialTransactions(params: any): Observable<any> {
        return this.httpClient.post<any>(buildURL('/v1/bills'), params);
    }
}
