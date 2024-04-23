import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class CashRegisterOperationsServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/cash-register-operations'));
    }


    openCaixa(param:any): Observable<any> {
        return this.httpClient.post<any>(`${this.basePath}`, param);
    }


}