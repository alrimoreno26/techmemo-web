import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {LazyLoadData, LazyResultData} from "../../standalone/data-table/models";
import {Observable} from "rxjs";
import {map} from "lodash";
import {silentIt} from "../interceptors/spinner.interceptor";

@Injectable({
    providedIn: 'root'
})
export class ReportsService extends AbstractService<any> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '');
    }

    stockAlert(data: LazyLoadData | Partial<LazyLoadData>): Observable<LazyResultData<any>> {
        const params = map(data, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');

        return this.httpClient.get<LazyResultData<any>>(`${buildURL('/v1/products')}/stock-alert?${params}`);
    }

    ordersStats(queryParams: any) {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.httpClient.get<any>(`${buildURL('/v1/reports')}`, {params});
    }
}
