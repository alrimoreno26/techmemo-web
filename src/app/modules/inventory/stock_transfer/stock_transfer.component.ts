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
            header: 'Nome', field: 'name', sort: true, class: 'text-center', visible: true
        },
        {
            header: 'Code', field: 'code',
            sort: true, class: 'text-center', visible: true, width: 210
        },
        {
            header: 'Classificação', field: 'type', filter: true,
            sort: false, class: 'text-center', visible: true, width: 210
        },
        {
            header: 'Preço', field: 'costPrice', pipe: 'currency',
            sort: true, class: 'text-center', visible: true, width: 210
        },
        {
            header: 'CFOP', sort: true, field: 'cfop',
            class: 'text-center', visible: true
        },
        {header: 'Ações', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(private translateService: TranslateService,
                public service: Stock_TransferStore,) {
        super();


    }

    ngOnInit() {

        this.dialogService.open(MStock_TransferComponent,{})
    }

}
