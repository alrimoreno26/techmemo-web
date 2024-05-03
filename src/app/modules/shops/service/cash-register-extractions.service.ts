import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {SessionServices} from "../../../core/injects/session.services";
import {Observable} from "rxjs";
import {CashRegisterDto, ChashRegisterSummaryDto} from "../../../core/models/commerce";
import {CashRegisterOperationsServices} from "../../../core/services/cash-register-operations.services";
import {CashRegisterExtractions} from "../../../core/services/cash-register-extractions";

@Injectable({providedIn: 'root'})
export class CashRegisterExtractionsService extends StoreComponentService<any> {

    override serverSide = true;


    constructor(private services: CashRegisterExtractions) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
    }

    override finalizeAdd = () => {
        this.patchState({dialog: false});
    };
}
