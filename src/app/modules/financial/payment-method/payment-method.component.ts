import {Component, OnInit} from '@angular/core';
import {PaymentMethodService} from "../service/payment-method.service";
import {HeadersTable} from "../../../standalone/data-table/models";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {AddEditPaymentMethodModal} from "./add-edit-payment-method/add-edit-payment-method-modal";

@Component({
    selector: 'c-payment-method',
    templateUrl: './payment-method.component.html',
    styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent extends BaseComponentDirective implements OnInit {

    override modalContent = AddEditPaymentMethodModal;

    override headersTable: HeadersTable[] = [
        {header: 'Nome', field: 'description', sort: true, class: 'text-center', visible: true},
        {header: 'Ativo', field: 'enabled', sort: true, class: 'text-center', visible: true},
        {
            header: 'Permitir Troco',
            field: 'allowsChange',
            sort: true,
            class: 'text-center',
            visible: true,
            export: true
        },
        {
            header: 'Enviar CF-e(SAT)',
            field: 'mandatorySendCfe',
            sort: true,
            class: 'text-center',
            visible: true,
            export: true
        },
        {
            header: 'Solicitar Convenio',
            field: 'requestAgreementInformation',
            sort: true,
            class: 'text-center',
            visible: true,
            export: true
        },
        {header: 'Ações', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(public service: PaymentMethodService) {
        super();
        this.service.loadAll({
            lazy: {
                pageNumber: 0,
                pageSize: 10,
            }
        })
    }

    ngOnInit() {
    }

}
