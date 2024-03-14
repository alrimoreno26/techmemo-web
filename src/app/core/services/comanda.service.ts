import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildOrderURL} from "../util";
import {LazyLoadData, LazyResultData} from "../../standalone/data-table/models";
import {Observable} from "rxjs";
import {map} from "lodash";
import {CreatePaymentTransactionTO} from "../models/orders";

@Injectable({
    providedIn: 'root'
})
export class OrdersService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildOrderURL('/v1/orders'));
    }

    findAllPaginateFilter(data: LazyLoadData | Partial<LazyLoadData>): Observable<LazyResultData<any>> {
        const params = map(data, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');

        return this.httpClient.get<LazyResultData<any>>(`${this.basePath}?${params}`);
    }

    addProductsOrders(id: string, params: any): Observable<any> {
        return this.httpClient.post<any>(`${this.basePath}/${id}/products`, params)
    }

    deleteProductsOrders(id: string, productId: string[]): Observable<any> {
        return this.httpClient.delete<any>(`${this.basePath}/${id}/products`, {body: productId})
    }

    loadOrders(paths: string[], queryParams: any): Observable<any> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return paths?.length > 0 ?
            this.client.get(`${this.basePath}/${paths.join('/')}`, {params}) :
            this.client.get(this.basePath + '/' + queryParams);
    }

    unionTables(tables: string[]): Observable<any> {
        return this.httpClient.post<any>(`${this.basePath}/union-tables`, tables)
    }

    transferProducts(params: any) {
        return this.httpClient.post<any>(`${this.basePath}/transfer-products`, params)
    }

    payments(params: CreatePaymentTransactionTO[]) {
        return this.httpClient.post<any>(`${this.basePath}/payments`, params)
    }

    changeFieldState(id: string, params: any) {
        return this.httpClient.patch<any>(`${this.basePath}/${id}`, params)
    }
}
