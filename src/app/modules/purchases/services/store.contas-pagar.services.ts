import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {ContasPagarService} from "../../../core/services/contas-pagar.service";
import {Observable} from "rxjs";
import {LazyLoadData} from "../../../standalone/data-table/models";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {BillLigthDto} from "../../../core/models/bills";

@Injectable({providedIn: 'platform'})
export class StoreContasPagarServices extends StoreComponentService<BillLigthDto> {

    override serverSide = true;
    override lazyLoadOnInit = true;

    constructor(private contasPagarService: ContasPagarService) {
        const defaultEntity: EntityState<BillLigthDto> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(contasPagarService, defaultEntity);
    }

    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.contasPagarService.findAllPaginate(lazy).pipe(
                tapResponse({
                    next: (result) => {
                        const {totalElements} = result;
                        const content = result.content.map((item: any, i: number) => {
                            const uuid = item.id;
                            const bigIntValue = BigInt(
                                "0x" + uuid.replace(/-/g, "")
                            );
                            return {
                                ...item,
                                bigId: Math.random(),
                                paymentInstallments: []
                            }
                        });
                        this.setAll(content);
                        this.patchState({total: totalElements});
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            );
        })
    ));


    loadInstallmentsBill(queryParams: any) {
        this.contasPagarService.loadInstallmentsBill(queryParams).subscribe((data) => {
            const { selected, entities } = this.state();

            const updatedEntities = entities.map((entity: any) =>
                entity.id === selected.id
                    ? { ...entity, paymentInstallments: data.content }
                    : entity
            );
            this.setAll(updatedEntities);
        })
    }
}
