import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {ContasPagarService} from "../../../core/services/contas-pagar.service";
import {Observable} from "rxjs";
import {LazyLoadData} from "../../../standalone/data-table/models";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {BillLigthDto} from "../../../core/models/bills";

@Injectable({providedIn: 'platform'})
export class StoreContasPagarServices extends StoreComponentService<any> {

    summary$: Signal<any | null> = this.selectSignal(state => state.summary);
    installments$: Signal<any | null> = this.selectSignal(state => state.installments);
    allInstallments$: Signal<any | null> = this.selectSignal(state => state.allInstallments);

    override serverSide = true;
    override lazyLoadOnInit = true;

    constructor(private contasPagarService: ContasPagarService) {
        const defaultEntity: EntityState<any> & { summary?: any, installments?: any, allInstallments?:any } =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(contasPagarService, defaultEntity);
    }

    resetState() {
        this.setSelected(null)
        this.patchState({installments: null, selected: null});
    }
    // override preAdd = (data: any, _: any): void => {
    //     this.patchState({dialog: false});
    //     this.setAdd({data});
    // }

    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.contasPagarService.findAllPaginate(lazy).pipe(
                tapResponse({
                    next: (result) => {
                        const {page} = result;
                        const content = result.content.map((item: any, i: number) => {
                            return {
                                ...item,
                                bigId: Math.random(),
                                paymentInstallments: []
                            }
                        });
                        this.setAll(content);
                        this.patchState({total: page.totalElements});
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            );
        })
    ));

    loadAllInstallments(queryParams: any){
        this.contasPagarService.loadInstallmentsBill(queryParams).subscribe((data) => {
            this.patchState({allInstallments: data});
        })
    }

    loadInstallmentsBill(queryParams: any) {
        this.contasPagarService.loadInstallmentsBill(queryParams).subscribe((data) => {
            const {selected, entities} = this.state();

            const updatedEntities = entities.map((entity: any) =>
                entity.id === selected.id
                    ? {...entity, paymentInstallments: data.content}
                    : entity
            );
            selected.paymentInstallments = data.content;
            this.setSelected(selected)
            this.setAll(updatedEntities);
        })
    }

    editContaInstallment(queryParams: any) {
        this.contasPagarService.loadInstallmentsBill(queryParams).subscribe((data) => {
            const {selected, entities} = this.state();

            const updatedEntities = entities.map((entity: any) =>
                entity.id === selected.id
                    ? {...entity, paymentInstallments: data.content}
                    : entity
            );
            selected.paymentInstallments = data.content;
            this.setSelected(selected)
            this.setAll(updatedEntities);
            this.patchState({dialog: true, installments: data.content});
        })
    }

    getBillsByFinancialTransactions(id: any): Observable<any> {
        return this.contasPagarService.loadBillsByFinancial(id);
    }

    loadSummary() {
        this.contasPagarService.billsSummary().subscribe((data) => {
            const temp = {
                totalValuePaid: data.totalValuePaid,
                totalValueProvisionType: data.totalValueProvisionType,
                totalValuePay: data.totalValueToPay + data.totalValuePaid,
                totalValueToPay: data.totalValueToPay,
            }
            this.patchState({summary: temp});
        })
    }

    saveInstallmentsBill(contaId: any, id: string, data: any) {
        this.contasPagarService.saveInstallmentsBill(id, data).subscribe(() => {
            this.patchState({dialog: false});
            this.loadInstallmentsBill({billId: contaId, type: 'ALL', pageNumber: 0, pageSize: 50})
        })
    }

    saveInstallmentsBillBackground(contaId: any, id: string, data: any) {
        this.contasPagarService.saveInstallmentsBill(id, data).subscribe(() => {
            this.patchState({dialog: false});
            // this.loadInstallmentsBill({billId: contaId, type: 'ALL', pageNumber: 0, pageSize: 50})
        })
    }

    deleteInstallmentsBill(contaId: any, id: string) {
        this.contasPagarService.deleteInstallmentsBill(id).subscribe(() => {
            this.loadInstallmentsBill({billId: contaId, type: 'ALL', pageNumber: 0, pageSize: 50})
        })
    }
    deleteSimpleInstallments(id: string) {
        this.contasPagarService.deleteInstallmentsBill(id).subscribe(() => {
            this.loadAllInstallments({type: 'ALL', pageNumber: 0, pageSize: 50})
        })
    }
}
