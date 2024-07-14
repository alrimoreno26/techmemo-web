import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {LazyLoadData, LazyResultData} from "../../standalone/data-table/models";
import {SupplierDTO} from "../models/supplier";
import {map} from "lodash";

@Injectable({
    providedIn: 'root'
})
export class StructureBalancesServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/balances'));
    }

    generarBalance(params: any) {
        return this.httpClient.post<any>(`${this.basePath}`, params);
    }

    getBalances(data: any): Observable<LazyResultData<any>> {
        const params = map(data, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');
        return this.httpClient.get<LazyResultData<any>>(`${this.basePath}?${params}`);

    }

    getById(id: string): Observable<any> {
        return this.httpClient.get<any>(`${this.basePath}/${id}`);
    }
}
