import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../standalone/data-table/directives/base.component.directive";
import {StorePurchasesServices} from "./services/store.purchases.services";
import {HeadersTable} from "../../standalone/data-table/models";
import {MPurchasesComponent} from "./modals/m-purchases/m-purchases.component";
import {SupplierService} from "../inventory/forncedores/services/supplier.service";

@Component({
    selector: 'c-purchases',
    templateUrl: './purchases.component.html',
})
export class PurchasesComponent extends BaseComponentDirective implements OnInit{

    override modalContent = MPurchasesComponent;

    constructor(public service: StorePurchasesServices, public supplierService: SupplierService) {
        super()
        effect(() => {
            console.log( this.service.listEntities$())
        });
        // this.service.openModalAddOrEdit()
    }

    ngOnInit() {
        this.supplierService.loadAll({
            pageNumber: 0, pageSize: 50
        })
    }

    override headersTable: HeadersTable[] = [
        {header: 'Code', field: 'code', class: 'text-center', visible: true},
        {header: 'Fornecedor', field: 'supplier', pipe: 'deep', extraVal: 'name', class: 'text-center', visible: true},
        {header: 'Total Producto', field: 'amount', class: 'text-center', visible: true},
        {header: 'Total Compra', field: 'totalValue', pipe: 'currency', class: 'text-center', visible: true},
        {header: 'Fecha Compra', sort: true, field: 'created', pipe:'date', class: 'text-center', visible: true},
        {header: 'Estado', field: 'created', class: 'text-center', visible: true},
        {header: 'Ações', field: 'action', class: 'text-center', visible: true}
    ];
}
