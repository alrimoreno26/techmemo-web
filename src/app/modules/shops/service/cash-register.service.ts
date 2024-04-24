import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {SessionServices} from "../../../core/injects/session.services";
import {Observable} from "rxjs";
import {CashRegisterDto} from "../../../core/models/commerce";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {CashRegisterServices} from "../../../core/services/cash-register.services";

@Injectable({providedIn: 'root'})
export class CashRegisterService extends StoreComponentService<CashRegisterDto> {

    override serverSide = true;
    opened$: Observable<any> = this.select(state => state.opened);

    constructor(private services: CashRegisterServices) {
        const defaultEntity: EntityState<any> & { opened: any }=
            {entities: [], total: 0, dialog: false, loaded: false, opened: null};
        super(services, defaultEntity);
    }

    override create = this.effect((trigger$: Observable<{ data: CashRegisterDto }>) => trigger$.pipe(
        switchMap(({data}) => this.services.create(data).pipe(
            tapResponse({
                next: (response: any) => {
                    this.setAdd(response);
                    this.patchState({dialog: false});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    override update = this.effect((trigger$: Observable<{ data: Partial<CashRegisterDto> }>) => trigger$.pipe(
        switchMap(({data}) => this.services.update(data, 'id').pipe(
            tapResponse({
                next: () => {
                    this.setUpdate(data);
                    this.patchState({dialog: false});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    existsAnyWorking(): void {
        this.services.existsAnyWorking().subscribe((working:any) => {
            this.patchState({opened: working.cashRegisterId});
        });
    }


}
