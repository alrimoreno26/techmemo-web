import {Component, OnInit} from "@angular/core";
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
    }
    ngOnInit(): void {
        this.service.loadAll({pageNumber: 0, pageSize: 50, state: 'APPROVED'})
    }


    onRowExpand(event: TableRowExpandEvent) {
        //if (event.data.paymentInstallments.length === 0) {
        //this.service.setSelected(event.data);
        const id = event.data.id;
        // this.service.loadInstallmentsBill({billId: id, type: this.type, pageNumber: 0, pageSize: 50})
        //}
    }

    pageChange(event: any) {
        this.sizeInstallment = event.rows;
        this.firstInstallement = event.first;
        // this.service.loadSummary();
        // this.service.loadAllInstallments({
        //     type: this.type,
        //     startDate: formatDate(this.rangeDates[0]),
        //     endDate: formatDate(this.rangeDates[1]),
        //     pageNumber: this.firstInstallement,
        //     pageSize: this.sizeInstallment,
        // })
    }
}
