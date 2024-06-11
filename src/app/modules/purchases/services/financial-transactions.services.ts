import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {FinancialTransactionsService} from "../../../core/services/financial-transactions.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {StorePurchasesServices} from "./store.purchases.services";

@Injectable({providedIn: 'platform'})
export class FinancialTransactionsServices extends StoreComponentService<any> {

    goToPay$: Signal<any> = this.selectSignal(state => state.goToPay);
    approvedEnd$: Signal<any> = this.selectSignal(state => state.approvedEnd);

    constructor(private storeFinancialTransactions: FinancialTransactionsService, private storePurchasesServices: StorePurchasesServices) {
        const defaultEntity: EntityState<any> & { goToPay?: any, approvedEnd?: boolean } =
            {entities: [], total: 0, dialog: false, loaded: false, goToPay: null};
        super(storeFinancialTransactions, defaultEntity);
    }

    override openModalAddOrEdit = () => {
        this.patchState({goToPay: null});
    }

    updateFinancialTransaction(params: any, id: string) {
        this.storeFinancialTransactions.updateFinancialTransactions(params, id).subscribe(() => {
        })
    }

    changeStateFinancialTransaction(params: any, id: string) {
        return this.storeFinancialTransactions.updateFinancialTransactions(params, id).subscribe(() => {
            if (params.state !== undefined && params.state === 'APPROVED') {
                this.setSelected(null);
                this.storePurchasesServices.patchState({dialog: false, selected: null});
                this.storePurchasesServices.loadAll({lazy: {pageNumber: 0, pageSize: 50}});
            }
        })
    }

    override preAdd = (data: any, _: any): void => {
        this.patchState({goToPay: {...data, nextStep: true}})
        this.setAdd({data});
    }

}
