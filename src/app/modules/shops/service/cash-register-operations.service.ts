import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {SessionServices} from "../../../core/injects/session.services";
import {Observable} from "rxjs";
import {CashRegisterDto} from "../../../core/models/commerce";
import {CashRegisterOperationsServices} from "../../../core/services/cash-register-operations.services";

@Injectable({providedIn: 'root'})
export class CashRegisterOperationsService extends StoreComponentService<CashRegisterDto> {

    override serverSide = true;
    opened$: Observable<boolean> = this.select(state => state.opened);

    constructor(private services: CashRegisterOperationsServices,
                private sessionService: SessionServices,) {
        const defaultEntity: EntityState<any> & { opened: boolean }=
            {entities: [], total: 0, dialog: false, loaded: false, opened: false};
        super(services, defaultEntity);
    }

    openCaixa(param:any): void {
        this.services.openCaixa(param).subscribe((response:any) => {
            this.patchState({opened: true});
        });
    }
}