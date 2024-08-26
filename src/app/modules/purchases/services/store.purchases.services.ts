import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {OrdersTO} from "../../../core/models/orders";
import {PurchasesService} from "../../../core/services/purchases.service";
import {Observable, of, throwError} from "rxjs";
import {LazyLoadData} from "../../../standalone/data-table/models";
import {catchError, map, switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {StoreContasPagarServices} from "./store.contas-pagar.services";
import {LightsDTO} from "../../../core/models/utils";
import {FinancialTransactionsServices} from "./financial-transactions.services";
import {ContasPagarService} from "../../../core/services/contas-pagar.service";

@Injectable({providedIn: 'platform'})
export class StorePurchasesServices extends StoreComponentService<any> {

    override serverSide = true;
    override lazyLoadOnInit = true;

    billId$: Signal<any> = this.selectSignal(state => state.billId);
    listProductSelected$: Signal<any> = this.selectSignal(state => state.listProductSelected);

    constructor(private purchasesService: PurchasesService,
                private storeContasPagarServices: StoreContasPagarServices,
                private contasPagarService: ContasPagarService) {
        const defaultEntity: EntityState<any> & { billId?: any, listProductSelected: any[] } =
            {entities: [], total: 0, dialog: false, loaded: false, listProductSelected: []};
        super(purchasesService, defaultEntity);
    }

    resetState() {
        this.setSelected(null);
        this.patchState({billId: null, dialog: false, selected: null, listProductSelected: []});
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
        debugger
        if (data.originalPaymentInstallments === undefined) {
            this.purchasesService.createInstallmentsByFinancialTransactions(data).pipe(
                tapResponse({
                    next: (result) => {
                        this.patchState({billId: result.billId});
                        this.loadAll({pageNumber: 0, pageSize: 50, type: data.type})
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            ).subscribe();
        } else {
            this.purchasesService.deleteAllInstallmentsByFinancialTransactions(data.billId).pipe(
                switchMap(() => {
                    const installments = {
                        billId: data.billId,
                        installments: data.paymentInstallments
                    }
                    this.patchState({billId: data.billId});
                    return this.contasPagarService.saveInstallmentsBill(installments).pipe(
                        tapResponse({
                            next: (result) => {
                                this.loadAll({pageNumber: 0, pageSize: 50, type: data.type})
                            },
                            error: (err: HttpErrorResponse) => this.setError(err.error)
                        })
                    )
                })).subscribe();
        }
    }

    addSingleInstallment(data: any): Observable<any> {
        return this.contasPagarService.saveInstallmentsBill(data).pipe(
            switchMap((result) => {
                return this.storeContasPagarServices.getBillsByFinancialTransactions(data.billId).pipe(
                    map((bills: any) => {
                        const selected = this.selectedEntity$();
                        selected.paymentInstallments = bills.paymentInstallments;
                        this.setSelected(selected);
                        this.patchState({selected: selected});
                        this.loadAll({pageNumber: 0, pageSize: 50, type: data.type});
                        return selected; // retornamos el valor selected
                    })
                );
            }),
            catchError((err: HttpErrorResponse) => {
                this.setError(err.error);
                return throwError(err);
            })
        );
    }

    updatedInstallmentsBill(id: string, data: any, billId: string): Observable<any> {
        return this.contasPagarService.updatedInstallmentsBill(id, data).pipe(
            tapResponse({
                next: (result) => {
                    this.storeContasPagarServices.getBillsByFinancialTransactions(billId).subscribe((bills: any) => {
                        const selected = this.selectedEntity$();
                        selected.paymentInstallments = bills.paymentInstallments;
                        this.setSelected(selected);
                        this.patchState({selected: selected});
                        this.loadAll({pageNumber: 0, pageSize: 50})
                    })
                },
                error: (err: HttpErrorResponse) => this.setError(err.error)
            }));
    }

    deleteSingleInstallment(data: any): Observable<any> {
        return this.contasPagarService.deleteInstallmentsBill(data.id).pipe(
            tapResponse({
                next: (result) => {
                    this.storeContasPagarServices.getBillsByFinancialTransactions(data.billId).subscribe((bills: any) => {
                        const selected = this.selectedEntity$();
                        selected.paymentInstallments = bills.paymentInstallments;
                        this.setSelected(selected);
                        this.patchState({selected: selected});
                        this.loadAll({pageNumber: 0, pageSize: 50})
                    })
                },
                error: (err: HttpErrorResponse) => this.setError(err.error)
            })
        )
    }


    getById(id: string) {
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
            this.setListProductSelected(response.products);
            this.patchState({dialog: true, selected: response, billId: response.billId});
        });
    }

    getValuesOfCompra(id: string) {
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
            this.setListProductSelected(response.products);
            this.patchState({selected: response, billId: response.billId});
        });
    }

    setListProductSelected(data: any) {
        this.patchState({listProductSelected: data});
    }
}
