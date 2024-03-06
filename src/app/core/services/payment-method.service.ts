import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {buildOrderURL, buildURL} from "../util";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class PaymentMethodServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildOrderURL('/v1/orders/payments/structures'));
    }
}
