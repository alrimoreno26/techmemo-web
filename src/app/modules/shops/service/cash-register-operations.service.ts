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
    closing$: Observable<any> = this.select(state => state.closing);
    cashRegisterId$: Observable<any> = this.select(state => state.cashRegisterId);

    constructor(private services: CashRegisterOperationsServices,
                private sessionService: SessionServices,) {
        const defaultEntity: EntityState<any> & { opened: any, closing: null, cashRegisterId: string } =
            {entities: [], total: 0, dialog: false, loaded: false, opened: null, closing: null, cashRegisterId: ''};
        super(services, defaultEntity);
    }

    openCaixa(param: any): void {
        this.services.openCaixa(param).subscribe((response: any) => {
            this.patchState({opened: true, cashRegisterId: param.cashRegisterId});
        });
    }

    getOperationsById(cashRegisterId: string): void {
        this.services.getOperationsById(cashRegisterId).subscribe((response: any) => {
            this.setSelected(response)
            this.patchState({opened: null});
        })
    }

    closeCashRegisterOperations(value: number, cashRegisterId: string): void {
        this.services.closeCashRegisterOperations(value, cashRegisterId).subscribe((response: any) => {
            this.patchState({dialog: false, opened: false, closing: response, cashRegisterId: ''});
        })
    }

    setOpened(value: any): void {
        this.patchState({opened: value});
    }


}
