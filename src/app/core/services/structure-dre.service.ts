import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LazyResultData} from "../../standalone/data-table/models";
import {SupplierDTO} from "../models/supplier";
@Injectable({
    providedIn: 'root'
})
export class StructureDreServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/classifiers'));
    }

}
