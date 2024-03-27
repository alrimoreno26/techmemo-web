import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {OrdersService} from "../../../core/services/comanda.service";
import {OrdersTO} from "../../../core/models/orders";
import {SupplierService} from "../../inventory/forncedores/services/supplier.service";
import {PurchasesService} from "../../../core/services/purchases.service";

@Injectable({providedIn: 'platform'})
export class StorePurchasesServices extends StoreComponentService<any> {

    constructor(private purchasesService: PurchasesService) {
        const defaultEntity: EntityState<OrdersTO> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(purchasesService, defaultEntity);
    }

}
