import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {SessionServices} from "../../../core/injects/session.services";
import {Observable} from "rxjs";
import {CashRegisterDto, ChashRegisterSummaryDto} from "../../../core/models/commerce";
import {CashRegisterOperationsServices} from "../../../core/services/cash-register-operations.services";

@Injectable({providedIn: 'root'})
export class CashRegisterOperationsService extends StoreComponentService<CashRegisterDto> {

    override serverSide = true;
    opened$: Observable<any> = this.select(state => state.opened);

    constructor(private services: CashRegisterOperationsServices,
                private sessionService: SessionServices,) {
        const defaultEntity: EntityState<any> & { opened: any } =
            {entities: [], total: 0, dialog: false, loaded: false, opened: null};
        super(services, defaultEntity);
    }

    openCaixa(param: any): void {
        this.services.openCaixa(param).subscribe((response: any) => {
            this.patchState({opened: true});
        });
    }

    getOperationsById(cashRegisterId: string): void {
        this.services.getOperationsById(cashRegisterId).subscribe((response: any) => {
            this.setSelected(response)
            this.patchState({opened: null});
        })
    }

    closeCashRegisterOperations(cashRegisterId: string):void{
        this.services.closeCashRegisterOperations(cashRegisterId).subscribe((response: any) => {
            this.patchState({dialog: false, opened: null});
        })
    }


}
