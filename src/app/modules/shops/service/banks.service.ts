import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {BankAccount} from "../../../core/models/bills";
import {BanksServices} from "../../../core/services/banks.services";
import {CashRegisterServices} from "../../../core/services/cash-register.services";
import {Observable} from "rxjs";
import {CashRegisterDto} from "../../../core/models/commerce";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class BanksService extends StoreComponentService<BankAccount> {


    constructor(private services: BanksServices) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
    }

    override create = this.effect((trigger$: Observable<{ data: BankAccount }>) => trigger$.pipe(
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

    override update = this.effect((trigger$: Observable<{ data: Partial<BankAccount> }>) => trigger$.pipe(
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
}
