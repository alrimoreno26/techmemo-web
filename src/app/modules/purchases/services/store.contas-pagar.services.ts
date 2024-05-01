import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {OrdersTO} from "../../../core/models/orders";
import {ContasPagarService} from "../../../core/services/contas-pagar.service";

@Injectable({providedIn: 'platform'})
export class StoreContasPagarServices extends StoreComponentService<any> {

    constructor(private contasPagarService: ContasPagarService) {
        const defaultEntity: EntityState<OrdersTO> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(contasPagarService, defaultEntity);
    }

}
