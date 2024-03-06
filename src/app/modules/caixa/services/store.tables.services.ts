import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {TableTO} from "../../../core/models/tables";
import {TablesService} from "../../../core/services/tables.service";
import {groupBy} from "../../../core/util";

@Injectable({providedIn: 'platform'})
export class StoreTablesServices extends StoreComponentService<TableTO> {

    override serverSide = false;

    auth$: Signal<any | null> = this.selectSignal(state => state.raw);
    finalize$: Signal<boolean | false> = this.selectSignal(state => state.finalize);

    constructor(private tableService: TablesService) {
        const defaultEntity: EntityState<TableTO> & { raw?: any, finalize?: boolean } =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(tableService, defaultEntity);
    }

    override finalizeLoad = () => {
        const modify = Object.keys(groupBy(this.state().entities, 'unionTableId')).map(group => {
            return {tables: group, items: groupBy(this.state().entities, 'unionTableId')[group]};
        });
        this.patchState({raw: modify, finalize: false})
    }

    finalizeOrder(orderId: string) {
        this.tableService.finalizeOrder(orderId).subscribe(() => {
            this.patchState({finalize: true})
        })
    }
}
