import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {OrdersTO} from "../../../core/models/orders";
import {PurchasesService} from "../../../core/services/purchases.service";
import {Observable, of} from "rxjs";
import {LazyLoadData} from "../../../standalone/data-table/models";
import {map, switchMap} from "rxjs/operators";
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
                        const {content, page} = result;
                        this.setAll(content);
                        this.patchState({total: page.totalElements});
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            );
        })
    ));

    createInstallmentsByFinancialTransactions(data: any) {
        if (data.originalPaymentInstallments === undefined || data.originalPaymentInstallments.paymentInstallments.length === 0) {
            this.purchasesService.createInstallmentsByFinancialTransactions(data).pipe(
                tapResponse({
                    next: (result) => {
                        this.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            ).subscribe();
        } else {
            this.purchasesService.deleteAllInstallmentsByFinancialTransactions(data.billId).pipe(
                switchMap(() => {
                    const bills = {
                        classifierId: data.classifierId,
                        consecutiveDaysPaymentInstallments: data.consecutiveDaysPaymentInstallments,
                        description: data.description,
                        financialTransactionId: data.financialTransactionId,
                        paymentInstallments: data.paymentInstallments,
                        paymentStructureId: data.paymentStructureId,
                        provision: data.provision,
                        supplierId: data.supplierId,
                    }
                    return this.purchasesService.createInstallmentsByFinancialTransactions(bills).pipe(
                        tapResponse({
                            next: (result) => {
                                this.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                            },
                            error: (err: HttpErrorResponse) => this.setError(err.error)
                        })
                    )
                })).subscribe();
        }
    }

    getById(id:string) {
        this.purchasesService.findOneById(id).pipe(
            switchMap(response => {
                if (response.billId !== null) {
                    return this.storeContasPagarServices.getBillsByFinancialTransactions(response.billId).pipe(
                        map(data => {
                            response.paymentInstallments = data;
                            return response;
                        })
                    );
                } else {
                    return of(response);
                }
            })
        ).subscribe(response => {
            this.setSelected(response);
            this.patchState({dialog: true, selected: response});
        });
    }
}
