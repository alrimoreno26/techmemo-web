import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {ShopsServices} from "../../../core/services/shops.service";
import {ToastMessageService} from "../../../core/injects/toast-message.service";

@Injectable({providedIn: 'platform'})
export class ShopsService extends StoreComponentService<any> {

    constructor(private services: ShopsServices, private toastMessageService: ToastMessageService,) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
    }
    createTable(params: any){
        this.services.createTables(params).subscribe(()=>{
            this.toastMessageService.showMessage("success", 'Sucesso', 'Lista de mesas elevadas')
        })
    }
}
