import {Injectable} from "@angular/core";
import {PaymentMethodServices} from "../../../core/services/payment-method.service";
import {PaymentStructureTO} from "../../../core/models/financial";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";

@Injectable({providedIn: 'platform'})
export class PaymentMethodService extends StoreComponentService<PaymentStructureTO> {

    constructor(private services: PaymentMethodServices) {
        const defaultEntity: EntityState<PaymentStructureTO> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
    }

}
