import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {buildURL} from "../util";

@Injectable({
    providedIn: 'root'
})
export class PurchasesService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/financial-transactions'));
    }

    createInstallmentsByFinancialTransactions(params: any): Observable<any> {
        return this.httpClient.post<any>(buildURL('/v1/bills'), params);
    }

    deleteAllInstallmentsByFinancialTransactions(id: any): Observable<any> {
        return this.httpClient.delete<any>(buildURL(`/v1/bills/${id}/installments`));
    }

    patchProductsOrder(id: any, params: any) {
        return this.httpClient.patch<any>(buildURL(`financial-transaction-products/${id}`), params)
    }

}
