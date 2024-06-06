import {Component, OnInit} from '@angular/core';
import {PaymentMethodService} from "../service/payment-method.service";
import {HeadersTable} from "../../../standalone/data-table/models";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {FinancialClasificationService} from "../service/financial-clasification.service";
import {
    AddEditFinancialClasificationModal
} from "./add-edit-financial-clasification/add-edit-financial-clasification-modal";

@Component({
    selector: 'c-financial-clasification',
    templateUrl: './financial-clasification.component.html',
})
export class FinancialClasificationComponent extends BaseComponentDirective implements OnInit {

    override modalContent = AddEditFinancialClasificationModal;
    override headersTable: HeadersTable[] = [
        {header: 'Code', field: 'code', sort: true, class: 'text-center', visible: true},
        {header: 'Nome', field: 'name', sort: true, class: 'text-center', visible: true},
        {header: 'Tipo', field: 'type', sort: true, class: 'text-center', visible: true},
        {header: 'Ações', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(public service: FinancialClasificationService) {
        super();
        this.service.loadAll({
                pageNumber: 0,
                pageSize: 25,

        })
    }

    ngOnInit() {
    }

}
