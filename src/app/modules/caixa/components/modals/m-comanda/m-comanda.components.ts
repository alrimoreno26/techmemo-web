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
    balconyCode: string;
    selectedTable: any;

    constructor(public caixaService: CaixaService,
                public tables: StoreTablesServices, private dialogRegistryService: DialogRegistryService) {
        super(caixaService)
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            if (caixaService.orderCreate$()) {
                this.ref.close();
            }
        });
    }

    ngOnInit() {
        const data = this.config.data;
        console.log(data)
        if (data.type === 'BALCONY') {
            const sellBalcon = this.caixaService.listEntities$()?.filter(f => f.type === 'BALCONY') || [];
            if (sellBalcon.length > 0) {
                const lastElement = sellBalcon.slice(-1)[0];
                this.balconyCode = (Number(lastElement.code) + 1).toString();
            } else {
                this.balconyCode = '2001';
            }
        }
        if (data.type === 'ORDER') {
            this.balconyCode = (Number(data.item.code.split("C")[1])).toString();
        }
    }

    criarComanda() {
        const param = {
            clientDocument: '',
            clientName: this.clientName,
            type: this.config.data.type,
            byRoute: this.config.data?.type,
            tableId: this.config.data ? this.config.data.id : this.selectedTable ? this.selectedTable.id : null,
            tableUnion: this.config.data?.tableUnion,
            ...((this.config.data.type === 'BALCONY' || this.config.data.type === 'ORDER') && {code: this.balconyCode})
        }
        this.config.data?.inside ? this.caixaService.createInTableOrders(param) : this.caixaService.create(param);

    }
}
