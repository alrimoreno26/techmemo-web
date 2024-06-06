import {Injectable, Signal} from "@angular/core";
import {PaymentMethodServices} from "../../../core/services/payment-method.service";
import {PaymentStructureTO} from "../../../core/models/financial";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {LightsDTO} from "../../../core/models/utils";

@Injectable({providedIn: 'platform'})
export class PaymentMethodService extends StoreComponentService<PaymentStructureTO> {

    lightEntities$: Signal<LightsDTO[]> = this.selectSignal(state => state.lightEntities);

    constructor(private services: PaymentMethodServices) {
        const defaultEntity: EntityState<PaymentStructureTO> & { lightEntities: LightsDTO[] } =
            {entities: [], total: 0, dialog: false, loaded: false, lightEntities: []};
        super(services, defaultEntity);
    }

    loadLight() {
        this.services.findAll().subscribe((response: any) => {
            const temp = response.content.map((item: any) => {
                return {
                    id: item.id,
                    description: item.description,
                    type: item.type,
                }
            })
            this.patchState({lightEntities: temp});
        });
    }
}
