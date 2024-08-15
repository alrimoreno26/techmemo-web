import {Component, effect, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../standalone/data-table/directives/base.component.directive";
import {TableRowExpandEvent} from "primeng/table";
import {formatDate} from "../../core/util";
import {StorePurchasesServices} from "../purchases/services/store.purchases.services";

@Component({
    selector: 'c-transfer',
    templateUrl: './transfer.component.html',
})
export class TransferComponent extends BaseComponentDirective implements OnInit {

    first = 0;
    size = 20;
    firstInstallement = 0;
    sizeInstallment = 20;

    constructor(public service: StorePurchasesServices) {
        super();
        effect(()=>{
            console.log(this.service.listProductSelected$())
            console.log(this.service.listEntities$())
        })
    }
    ngOnInit(): void {
        this.service.loadAll({pageNumber: 0, pageSize: 50, state: 'SENT'})
    }


    onRowExpand(event: TableRowExpandEvent) {
        const id = event.data.id;
        this.service.getById(id);
    }

    approve(product:any){
        console.log(product)
    }

    pageChange(event: any) {
        this.sizeInstallment = event.rows;
        this.firstInstallement = event.first;
    }
}
