import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {
    BaseModalStoreComponentDirective
} from "../../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {CaixaService} from "../../../services/caixa.service";
import {
    BaseModalComponentDirective
} from "../../../../../standalone/data-table/directives/base.modal.component.directive";
import {StoreTablesServices} from "../../../services/store.tables.services";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-comanda',
    templateUrl: './m-comanda.components.html',
})
export class MComandaComponents extends BaseModalComponentDirective implements OnInit {

    clientName: string;
    selectedTable: any;

    constructor(public caixaService: CaixaService,
                public tables: StoreTablesServices,private dialogRegistryService: DialogRegistryService) {
        super(caixaService)
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            if(caixaService.orderCreate$()){
                this.ref.close();
            }
        });
    }

    ngOnInit() {
    }

    criarComanda() {
        const param = {
            clientDocument: '',
            clientName: this.clientName,
            tableId: this.config.data ? this.config.data.id : this.selectedTable ? this.selectedTable.id : null
        }
        this.config.data?.inside ? this.caixaService.createInTableOrders(param) : this.caixaService.create(param);

    }
}
