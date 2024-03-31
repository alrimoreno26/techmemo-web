import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ShopsServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/tables'));
    }

    createTables(params:any){
        return this.httpClient.post<any>(`${this.basePath}`,params)
    }
}
