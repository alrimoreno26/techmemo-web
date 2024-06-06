import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {OrdersTO} from "../../../core/models/orders";
import {PurchasesService} from "../../../core/services/purchases.service";
import {Observable} from "rxjs";
import {LazyLoadData} from "../../../standalone/data-table/models";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {StoreContasPagarServices} from "./store.contas-pagar.services";
import {LightsDTO} from "../../../core/models/utils";
import {FinancialTransactionsServices} from "./financial-transactions.services";

@Injectable({providedIn: 'platform'})
export class StorePurchasesServices extends StoreComponentService<any> {

    override serverSide = true;
    override lazyLoadOnInit = true;

    constructor(private purchasesService: PurchasesService, private storeContasPagarServices: StoreContasPagarServices, private financialTransactionsServices: FinancialTransactionsServices) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(purchasesService, defaultEntity);
    }

    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.purchasesService.findAllPaginate(lazy).pipe(
                tapResponse({
                    next: (result) => {
                        const {content, totalElements} = result;
                        // const content: LightsDTO[] = result.content.map((item: any, i: number) => {
                        //     return {
                        //         id: item.id,
                        //         code: item.code,
                        //         name: item.name
                        //     }
                        // })
                        this.setAll(content);
                        this.patchState({total: totalElements});
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            );
        })
    ));

    createInstallmentsByFinancialTransactions(data: any) {
        if (data.editing) {
            this.financialTransactionsServices.updateFinancialTransaction({state: 'APPROVED'}, data.financialTransactionId)
            this.patchState({dialog: false});
            this.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
        } else {
            this.purchasesService.createInstallmentsByFinancialTransactions(data).subscribe((response) => {
                this.patchState({dialog: false});
                this.loadAll({lazy: {pageNumber: 0, pageSize: 50}})

            })
        }
    }

    getById(id: string) {
        this.purchasesService.findOneById(id).subscribe((response) => {
            this.storeContasPagarServices.getBillsByFinancialTransactions(response.billId).subscribe((data) => {
                response.paymentInstallments = data;
                this.setSelected(response);
                this.patchState({dialog: true, selected: response})
            });


        });
    }
}
