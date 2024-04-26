import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ChashRegisterSummaryDto} from "../models/commerce";

@Injectable({
    providedIn: 'root'
})
export class CashRegisterOperationsServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/cash-register-operations'));
    }


    openCaixa(param: any): Observable<any> {
        return this.httpClient.post<any>(`${this.basePath}`, param);
    }

    getOperationsById(cashRegisterId: string): Observable<ChashRegisterSummaryDto> {
        return this.httpClient.post<ChashRegisterSummaryDto>(`${this.basePath}/closing-summary?cashRegisterId=${cashRegisterId}`,{});
    }
    closeCashRegisterOperations(cashRegisterId: string): Observable<any> {
        return this.httpClient.post<any>(`${this.basePath}/close?cashRegisterId=${cashRegisterId}`,{});
    }
}
