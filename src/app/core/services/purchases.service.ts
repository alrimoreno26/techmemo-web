import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {LazyLoadData, LazyResultData} from "../../standalone/data-table/models";
import {Observable, of} from "rxjs";
import {map} from 'lodash';
import {buildURL} from "../util";
import {SupplierDTO} from "../models/supplier";

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
}
