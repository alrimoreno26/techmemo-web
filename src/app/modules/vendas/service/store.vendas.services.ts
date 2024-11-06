import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {OrdersTO} from "../../../core/models/orders";
import {OrdersService} from "../../../core/services/comanda.service";

@Injectable({providedIn: 'platform'})
export class StoreVendasServices extends StoreComponentService<OrdersTO> {

    details$: Signal<any | null> = this.selectSignal(state => state.raw);
    canceled$: Signal<any | null> = this.selectSignal(state => state.canceled);

    override serverSide = false;
    /**
     * Control to Hide and Show
     */
    showSidebar: boolean;

    constructor(private tableService: OrdersService) {
        const defaultEntity: EntityState<OrdersTO> & { raw?: any, details: boolean, canceled?: any } =
            {entities: [], total: 0, dialog: false, loaded: false, details: false};
        super(tableService, defaultEntity);
    }

    hideShow(value: boolean): void {
        this.showSidebar = value;
    }

    getDetails(order: any) {
        console.log(order)
        this.tableService.loadOrders([], order.id).subscribe((response: any) => {
            this.patchState({raw: response})
            this.showSidebar = true;
        });
    }

    getDeletedProductsFromOrder(order: any) {
        console.log(order)
        const params = {
            orderId: order.id,
            pageNumber: 0,
            pageSize: 100
        }
        console.log(params)
        this.tableService.loadDeletedProductsFromOrder(params).subscribe((response: any) => {
            this.patchState({canceled: response.content})
            console.log(response)
        });
    }
}
