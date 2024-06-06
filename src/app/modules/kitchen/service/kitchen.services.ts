import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {ReportsService} from "../../../core/services/reports.service";
import {CategoryDto} from "../../../core/models";
import {ReportsDTO} from "../../../core/models/reports";
import {OrdersService} from "../../../core/services/comanda.service";
import {fromOrdersListActions} from "../../caixa/store/caixa.actions";
import {OrderLightTO, ProductLightTO} from "../../../core/models/orders";

@Injectable({providedIn: 'platform'})
export class StoreKitchenService extends StoreComponentService<ProductLightTO> {

    override serverSide = false;

    constructor(private kitchenService: OrdersService) {
        const defaultEntity: EntityState<ProductLightTO> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(kitchenService, defaultEntity);
    }

    loadKitchenOrders(params: any) {
        this.kitchenService.pendingPrepare(params).subscribe((response: any) => {
            const allProducts: any[] = [];
            response.content.forEach((order: OrderLightTO) => {
                const {code, created, products} = order;
                const productsWithCodeAndCreated = products.map(product => ({
                    code,
                    created,
                    ...product
                }));
                allProducts.push(...productsWithCodeAndCreated);
            });
            this.patchState({entities: allProducts})
        })
    }

    modifyState(id: string, params: any) {
        this.kitchenService.updateProductsOrders(id, params).subscribe((response: any) => {
            this.loadKitchenOrders({pageNumber: 0, pageSize: 100});
        });
    }
}
