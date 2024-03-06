import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {buildOrderURL, buildURL} from "../util";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ShopsServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildOrderURL('/v1/orders/tables'));
    }

    createTables(params:any){
        return this.httpClient.post<any>(`${this.basePath}`,params)
    }
}
