import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {FinancialTransactionsService} from "../../../core/services/financial-transactions.service";

@Injectable({providedIn: 'platform'})
export class FinancialTransactionsServices extends StoreComponentService<any> {

    goToPay$: Signal<any> = this.selectSignal(state => state.goToPay);

    constructor(private storeFinancialTransactions: FinancialTransactionsService) {
        const defaultEntity: EntityState<any> & { goToPay?: any } =
            {entities: [], total: 0, dialog: false, loaded: false, goToPay: null};
        super(storeFinancialTransactions, defaultEntity);
    }

    override openModalAddOrEdit = () => {
        this.patchState({goToPay: null});
    }

    override preAdd = (data: any, _: any): void => {
        this.patchState({goToPay: {...data, nextStep: true}})
        this.setAdd({data});
    }

    preEdit(item:any) {
        this.patchState({goToPay: {...item}})
    }
}
