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
        super(httpClient, buildURL('/v1/suppliers'));
    }

    loadSupplier(data: LazyLoadData | Partial<LazyLoadData>): Observable<LazyResultData<SupplierDTO>> {
        const params = map(data, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');
        return this.httpClient.get<LazyResultData<SupplierDTO>>(`${this.basePath}?${params}`);
    }
}