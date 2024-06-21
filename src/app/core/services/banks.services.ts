import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {Observable} from "rxjs";
import {LazyResultData} from "../../standalone/data-table/models";
import {BankAccount} from "../models/bills";

@Injectable({
    providedIn: 'root'
})
export class BanksServices extends AbstractService<BankAccount> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/bank-accounts'));
    }

    override findAllPaginate(queryParams: any): Observable<LazyResultData<BankAccount>> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.httpClient.get<LazyResultData<BankAccount>>(`${this.basePath}?${params}`);
    }
}
