import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {LazyLoadData, LazyResultData} from "../../standalone/data-table/models";
import {Observable} from "rxjs";
import {map} from "lodash";
import {CreatePaymentTransactionTO} from "../models/orders";
import {DeleteOrderProductDto} from "../models/products";

@Injectable({
    providedIn: 'root'
})
export class OrdersService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/orders'));
    }

    override findAllPaginate(queryParams: any): Observable<LazyResultData<any>> {
        const params = map(queryParams, (e, k) => (e !== undefined) ?
            Array.isArray(e) ? k + '=' + e.join(',') : k + '=' + e : null)
            .filter(f => f).join('&');

        return this.httpClient.get<LazyResultData<any>>(`${this.basePath}?${params}`);
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
    updateProductsOrders(id: string, params: any): Observable<any> {
        return this.httpClient.patch<any>(`${this.basePath}/products/${id}`, params)
    }
    getProductOrder(id: string): Observable<any> {
        return this.httpClient.get<any>(`${this.basePath}/products/${id}`)
    }

    deleteProductsOrders(id: string, entity: DeleteOrderProductDto): Observable<any> {
        return this.httpClient.delete<any>(`${this.basePath}/${id}/products`, {body: entity})
    }

    loadDeletedProductsFromOrder(queryParams: any): Observable<any> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.httpClient.get<any>(`${this.basePath}/deleted-products`, {params})
    }

    loadOrders(paths: string[], queryParams: any): Observable<any> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return paths?.length > 0 ?
            this.client.get(`${this.basePath}/${paths.join('/')}`, {params}) :
            this.client.get(this.basePath + '/' + queryParams);
    }

    loadOrdersUnion(paths: string[], queryParams: any): Observable<any> {
        return this.client.get(`${this.basePath}/${paths.join('/')}?unionTableId=${queryParams}`);
    }

    unionTables(tables: string[]): Observable<any> {
        return this.httpClient.post<any>(`${buildURL('/v1')}/union-tables`, tables)
    }

    transferProducts(params: any) {
        return this.httpClient.post<any>(`${this.basePath}/transfer-products`, params)
    }

    payments(params: CreatePaymentTransactionTO[]) {
        return this.httpClient.post<any>(`${buildURL('/v1')}/payments`, params)
    }

    changeFieldState(id: string, params: any) {
        return this.httpClient.patch<any>(`${this.basePath}/${id}`, params)
    }

    pendingPrepare(queryParams: any) {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.httpClient.get<any>(`${this.basePath}/pendings?${params}`)
    }

    sentDataToKitchen(id: string) {
        return this.httpClient.post<any>(`${this.basePath}/${id}/print`,{})
    }
}
