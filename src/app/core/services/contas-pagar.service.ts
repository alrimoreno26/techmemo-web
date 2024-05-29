import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {LazyResultData} from "../../standalone/data-table/models";
import {Observable} from "rxjs";
import {buildURL} from "../util";
import {silentIt} from "../interceptors/spinner.interceptor";
import {BillSummaryDto} from "../models/bills";

@Injectable({
    providedIn: 'root'
})
export class ContasPagarService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/bills'));
    }

    loadBillsByFinancial(id: any): Observable<LazyResultData<any>> {
        return this.client.get<LazyResultData<any>>(`${this.basePath}/${id}`);
    }

    loadInstallmentsBill(queryParams: any): Observable<LazyResultData<any>> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.client.get<LazyResultData<any>>(buildURL('/v1/bill-payment-installments'), {params});
    }
    billsSummary(): Observable<BillSummaryDto> {
        return this.client.get<BillSummaryDto>(buildURL('/v1/bill-payment-installments/summary'),{context: silentIt()});
    }

    saveInstallmentsBill(id:string, data: any): Observable<any> {
        return this.client.patch(buildURL(`/v1/bill-payment-installments/${id}`), data);
    }
}
