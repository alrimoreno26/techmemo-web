import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'platform'})
export class StockTransferService extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/stock-transfers'));
    }
}
