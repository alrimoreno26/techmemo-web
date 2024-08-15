import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {formatDate} from "../../../../core/util";
import {
    MFinancialTransactionsComponent
} from "../../../purchases/modals/m-financial-transactions/m-financial-transactions.component";
import {StorePurchasesServices} from "../../../purchases/services/store.purchases.services";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {ToastMessageService} from "../../../../core/injects/toast-message.service";
import {HeadersTable} from "../../../../standalone/data-table/models";
import {FinancialTransactionsEnum} from "../../../../core/enums/commerce";
import {FinancialTransactionsServices} from "../../../purchases/services/financial-transactions.services";

@Component({
    selector: 'c-vendas-directas',
    templateUrl: './vendas-directas.component.html',
    styleUrls: ['./vendas-directas.component.scss']
})
export class VendasDirectasComponent extends BaseComponentDirective implements OnInit {

    override modalContent = MFinancialTransactionsComponent;
    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth(), 31)];
    type: string = 'ALL';

    constructor(public service: StorePurchasesServices,
                public supplierService: SupplierService,
                public storeFinancialTransactions: FinancialTransactionsServices,
                private toastMessageService: ToastMessageService) {
        super()
    }

    ngOnInit() {
        this.service.loadAll({
            pageNumber: 0,
            pageSize: 25,
            type: 'BILLING ',
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1])
        })
        this.supplierService.loadAll({
            pageNumber: 0, pageSize: 50
        })
    }

    override headersTable: HeadersTable[] = [
        {header: 'Code', field: 'code', class: 'text-center', visible: true},
        {header: 'Loja', field: 'supplierName', class: 'text-center', visible: true},
        {header: 'Qtd Producto', field: 'amountProducts', class: 'text-center', visible: true},
        {header: 'Total Venda', field: 'totalValue', pipe: 'currency', class: 'text-center', visible: true},
        {header: 'Fecha Venda', sort: true, field: 'created', pipe: 'date', class: 'text-center', visible: true},
        {header: 'Estado', field: 'state', class: 'text-center', visible: true},
        {header: 'Ações', field: 'action', class: 'text-center', visible: true}
    ];

    customCrear(evt: any): void {
        this.service.openModalAddOrEdit()
        this.dialogService.open(MFinancialTransactionsComponent, {
            data: {type: 'BILLING'}
        })
    }

    customEdit(evt: any): void {
        if (evt.state === 'TYPING') {
            this.service.getById(evt.id);
        } else {
            this.service.patchState({dialog: false});
            this.toastMessageService.showMessage("info", 'Informação', 'Esta compra já foi processada')
        }
    }

    customDelete(evt: any) {
        if (evt.state === 'TYPING') {
            this.toastMessageService.showMessage("info", 'Informação', 'Esta compra já foi processada')
        }
    }

    applyFilter() {
        this.service.loadAll({
            pageNumber: 0,
            pageSize: 25,
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1])
        })
    }

    changeFilterType() {
        if (this.type === 'ALL') {
            this.service.loadAll({
                pageNumber: 0,
                pageSize: 25,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1])
            })
        } else {
            this.service.loadAll({
                pageNumber: 0,
                pageSize: 25,
                state: this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1])
            })
        }
    }

    despachar(evt: any) {
        let send = {
            state: 'SENT',
            type: 'BILLING'
        }
        console.log(evt)
        this.storeFinancialTransactions.changeStateFinancialTransaction(send, evt.id);
    }

    protected readonly FinancialTransactionsEnum = FinancialTransactionsEnum;
}
