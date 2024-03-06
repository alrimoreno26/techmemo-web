import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {tableState, TableTO} from "../../../core/models/tables";
import {TablesService} from "../../../core/services/tables.service";
import {groupBy} from "../../../core/util";
import {OrdersTO} from "../../../core/models/orders";
import {OrdersService} from "../../../core/services/comanda.service";
import {ProductLightDto} from "../../../core/models/products";
import {orderProduct} from "../../caixa/store/caixa.selectors";

@Injectable({providedIn: 'platform'})
export class StoreVendasServices extends StoreComponentService<OrdersTO> {

    details$: Signal<any | null> = this.selectSignal(state => state.raw);

    override serverSide = false;
    /**
     * Control to Hide and Show
     */
    showSidebar: boolean;
    constructor(private tableService: OrdersService) {
        const defaultEntity: EntityState<OrdersTO> & { raw?: any, details: boolean } =
            {entities: [], total: 0, dialog: false, loaded: false, details: false};
        super(tableService, defaultEntity);
    }

    hideShow(value: boolean): void {
        this.showSidebar = value;
    }

    getDetails(order:any){
        this.tableService.loadOrders([], order.id).subscribe((response:any)=>{
            this.patchState({raw: response})
            this.showSidebar = true;
        });
    }
}
