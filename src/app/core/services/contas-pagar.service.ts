import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {LazyResultData} from "../../standalone/data-table/models";
import {Observable} from "rxjs";
import {buildURL} from "../util";

@Injectable({
    providedIn: 'root'
})
export class ContasPagarService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/bills'));
    }

    loadInstallmentsBill(queryParams: any): Observable<LazyResultData<any>> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.client.get<LazyResultData<any>>(buildURL('/v1/bill-payment-installments'), {params});
    }
}
