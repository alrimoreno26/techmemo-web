import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {OrdersService} from "../../../core/services/comanda.service";
import {OrdersTO} from "../../../core/models/orders";
import {SupplierService} from "../../inventory/forncedores/services/supplier.service";
import {PurchasesService} from "../../../core/services/purchases.service";
import {FinancialTransactionsService} from "../../../core/services/financial-transactions.service";

@Injectable({providedIn: 'platform'})
export class FinancialTransactionsServices extends StoreComponentService<any> {

    constructor(private storeFinancialTransactions: FinancialTransactionsService) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(storeFinancialTransactions, defaultEntity);
    }



}
