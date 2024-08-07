import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class TablesService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/tables'));
    }

    changeStateTable(orderId:string, stateOrder: string){
        return this.httpClient.patch<any>(this.basePath + '/' + orderId, {state: stateOrder})
    }

    allTableInUnion(unionTableId:string){
        return this.httpClient.get<any>(this.basePath+`/union-table?unionTableId=${unionTableId}`)
    }
}
