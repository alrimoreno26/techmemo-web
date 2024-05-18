import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LazyResultData} from "../../standalone/data-table/models";
import {SupplierDTO} from "../models/supplier";
@Injectable({
    providedIn: 'root'
})
export class FinancialClassifiersService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/classifiers'));
    }

    override findAllPaginate(queryParams: any): Observable<LazyResultData<any>> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.httpClient.get<LazyResultData<SupplierDTO>>(`${this.basePath}?${params}`);
    }
}
