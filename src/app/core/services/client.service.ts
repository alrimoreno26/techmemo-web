import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {buildURL} from "../util";
import {ClientDto} from "../models";

@Injectable({
    providedIn: 'root'
})
export class ClientService extends AbstractService<ClientDto> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/clients'));
    }

}
