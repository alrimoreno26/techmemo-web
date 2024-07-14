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
    unionTable$: Signal<any[]> = this.selectSignal(state => state.unionTable);

    constructor(private tableService: TablesService) {
        const defaultEntity: EntityState<TableTO> & { raw?: any, finalize?: boolean, unionTable: any[] } =
            {entities: [], total: 0, dialog: false, loaded: false, unionTable: []};
        super(tableService, defaultEntity);
    }

    override finalizeLoad = () => {
        const modify = Object.keys(groupBy(this.state().entities, 'unionTableId')).map(group => {
            return {tables: group, items: groupBy(this.state().entities, 'unionTableId')[group]};
        });
        this.patchState({raw: modify, finalize: false})
    }

    changeStateTable(orderId: string, stateOrder: string) {
        this.tableService.changeStateTable(orderId, stateOrder).subscribe(() => {
            if (stateOrder === 'FREE') {
                this.patchState({finalize: true})
            }
        })
    }

    allTableInUnion(id: string) {
        this.tableService.allTableInUnion(id).subscribe((union: any) => {
            this.patchState({unionTable: union})
        })
    }

}
