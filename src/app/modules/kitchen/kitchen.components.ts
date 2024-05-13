import {Component, effect, OnInit} from '@angular/core';
import {CaixaService} from "../caixa/services/caixa.service";
import {StoreKitchenService} from "./service/kitchen.services";
import {ProductLightTO} from "../../core/models/orders";
import {NotifyService} from "../../layout/service/notify.service";

@Component({
    selector: 'c-kitchen',
    templateUrl: './kitchen.components.html',
    styleUrls: ['./kitchen.components.scss']
})
export class KitchenComponents implements OnInit{

    orders: ProductLightTO[] = [];

    constructor(public storeKitchenService: StoreKitchenService,public notify: NotifyService,) {
        this.notify.sentKitchen$.subscribe(sent => {
            if (sent) {
                this.storeKitchenService.loadKitchenOrders({pageNumber: 0, pageSize: 100})
            }
        })
        effect(() => {
            if(this.storeKitchenService.listEntities$().length > 0){
                this.orders = this.storeKitchenService.listEntities$()
            }
        });

    }
    ngOnInit() {
        this.storeKitchenService.loadKitchenOrders({pageNumber: 0, pageSize: 100})
    }
}
