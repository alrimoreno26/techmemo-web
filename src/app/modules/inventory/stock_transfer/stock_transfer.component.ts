import {Component, OnInit} from '@angular/core';
import {HeadersTable} from "../../../standalone/data-table/models";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {TranslateService} from "@ngx-translate/core";
import {MStock_TransferComponent} from "./components/m-stock_transfer.component";
import {AdditionalComponents} from "../../caixa/components/modals/additionals/additional-components.component";
import {Stock_TransferStore} from "./store/stock_transfer.store";

@Component({
    selector: 'c-stock_transfer',
    templateUrl: './stock_transfer.component.html'
})
export class Stock_TransferComponent extends BaseComponentDirective implements OnInit {

    override modalContent = MStock_TransferComponent;
    override headersTable: HeadersTable[] = [
        {
            header: 'Criado', field: 'created', sort: true, class: 'text-center',
            pipe: 'date',
            visible: true
        },
        {
            header: 'Local de origem', field: 'sourceCommerceName',
            sort: true, class: 'text-center', visible: true, width: 210
        },
        {
            header: 'Local de destino', field: 'destinationCommerceName', filter: true,
            sort: false, class: 'text-center', visible: true, width: 210
        },
        {
            header: 'Quantidade de produtos', field: 'countProducts',
            class: 'text-center', visible: true, width: 210
        },
        {
            header: 'Total em dinheiro', field: 'totalPrice', pipe:'currency',
            class: 'text-center', visible: true
        },
        {header: 'Ações', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(private translateService: TranslateService,
                public service: Stock_TransferStore,) {
        super();


    }

    ngOnInit() {

        //this.dialogService.open(MStock_TransferComponent,{})
    }

}
