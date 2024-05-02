import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ChashRegisterSummaryDto} from "../models/commerce";

@Injectable({
    providedIn: 'root'
})
export class CashRegisterExtractions extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/cash-register-extractions'));
    }

}
