import {Component, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../standalone/data-table/directives/base.component.directive";
import {StorePurchasesServices} from "./services/store.purchases.services";
import {HeadersTable} from "../../standalone/data-table/models";
import {MFinancialTransactionsComponent} from "./modals/m-financial-transactions/m-financial-transactions.component";
import {SupplierService} from "../inventory/forncedores/services/supplier.service";
import {formatDate} from "../../core/util";
import {FinancialTransactionsEnum} from "../../core/enums/commerce";
import {ToastMessageService} from "../../core/injects/toast-message.service";
import {FinancialTransactionsServices} from "./services/financial-transactions.services";
import {takeUntil} from "rxjs";
import {confirmDialog} from "../../core/rx/confirm";
import {BaseStoreServices} from "../../standalone/data-table/class/base.store.services";
import {ConfirmServices} from "../../core/injects/confirm.services";

@Component({
    selector: 'c-purchases',
    templateUrl: './purchases.component.html',
})
export class PurchasesComponent extends BaseComponentDirective implements OnInit {

    override modalContent = MFinancialTransactionsComponent;
    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth(), 31)];
    type: string = 'ALL';
    visible = false;

    constructor(public service: StorePurchasesServices,
                public supplierService: SupplierService,
                private confirmationService: ConfirmServices,
                public storeFinancialTransactions: FinancialTransactionsServices,
                private toastMessageService: ToastMessageService,) {
        super()
    }

    ngOnInit() {
        this.supplierService.loadAll({
            pageNumber: 0, pageSize: 50
        })
    }

    override headersTable: HeadersTable[] = [
        {header: 'Code', field: 'code', class: 'text-center', visible: true},
        {header: 'Fornecedor', field: 'supplierName', class: 'text-center', visible: true},
        {header: 'Qtd Producto', field: 'amountProducts', class: 'text-center', visible: true},
        {header: 'Total Compra', field: 'totalValue', pipe: 'currency', class: 'text-center', visible: true},
        {header: 'Fecha Compra', sort: true, field: 'created', pipe: 'date', class: 'text-center', visible: true},
        {header: 'Estado', field: 'state', class: 'text-center', visible: true},
        {header: 'Ações', field: 'action', class: 'text-center', visible: true}
    ];

    customCrear(evt: any): void {
        this.service.openModalAddOrEdit()
        this.dialogService.open(MFinancialTransactionsComponent, {
            data: {type: 'EXPENSES'}
        })
    }

    customEdit(evt: any): void {
        if (evt.state === 'TYPING') {
            this.service.openModalAddOrEdit()
            this.dialogService.open(MFinancialTransactionsComponent, {
                data: {type: 'EXPENSES'}
            })
            this.service.getById(evt.id);
        } else {
            this.service.patchState({dialog: false});
            if (evt.state === 'PENDING_APPROVAL') {
                this.visible = true;
                this.service.getValuesOfCompra(evt.id)
            } else {
                this.service.patchState({dialog: false});
                this.toastMessageService.showMessage("info", 'Informação', 'Esta compra já foi processada')
            }
        }
    }

    showCompra(evt: any): void {
        this.visible = true;
        this.service.getValuesOfCompra(evt.id)
    }

    customDelete(evt: any) {
        if (evt.state === 'APPROVED') {
            this.toastMessageService.showMessage("info", 'Informação', 'Esta compra já foi processada')
        } else {
            this.confirmationService.deleteConfirm().pipe(
                takeUntil(this.ngUnsubscribe),
                confirmDialog(
                    () => {
                        if (this.service) {
                            this.service.delete({id: evt.id});
                        }
                    }
                )
            ).subscribe();
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

    protected readonly FinancialTransactionsEnum = FinancialTransactionsEnum;
}
