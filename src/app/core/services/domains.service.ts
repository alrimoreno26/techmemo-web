import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.services";
import {Domains} from "../models/role";
import {HttpClient} from "@angular/common/http";
import {buildUsersURL} from "../util";

@Injectable({
    providedIn: 'root'
})
export class DomainsService extends AbstractService<Domains> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildUsersURL('/v1/'));
    }
}
