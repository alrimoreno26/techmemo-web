import {Component, OnInit} from "@angular/core";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";

@Component({
    templateUrl: './m-contas-pagar.component.html',
    styles: [`
        ::ng-deep .p-dialog .p-dialog-content {
            height: auto;
            overflow: hidden;
        }
    `]
})
export class MContasPagarComponent extends BaseModalStoreComponentDirective implements OnInit {

    selectedItem: any;
    selected: any;
    suggestions: any[] = [];
    fatura = 288.39;
    description = '';
    parcelas = false;
    qParcelas = 0;
    vencimiento = 'fixo';
    rangeDates: Date = new Date()
    listParcelas: any[] = []

    constructor(private storeService: StoreContasPagarServices, public paymentMethodService: PaymentMethodService) {
        super(storeService);
        this.paymentMethodService.loadAll({lazy: {pageNumber: 0, pageSize: 10}})
    }

    ngOnInit(): void {

    }


    search(event: AutoCompleteCompleteEvent) {

    }

    gerarParcelas() {
        if (this.parcelas) {
            this.listParcelas = [];
            const monthlyPayment = this.fatura / this.qParcelas;
            let currentDate = this.rangeDates;
            for (let i = 0; i < this.qParcelas; i++) {

                if (this.vencimiento !== 'fixo') {
                    currentDate.setDate(currentDate.getDate() + 1);
                } else {
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
                let tempDate = new Date(currentDate);
                this.listParcelas.push({
                    parcela: i + 1,
                    value: monthlyPayment,
                    vencimento: tempDate,
                    description: this.description
                })
            }
        } else {
            this.listParcelas.push({
                parcela: 1,
                value: this.fatura,
                vencimento: this.rangeDates.setMonth(this.rangeDates.getMonth() + 1),
                description: this.description
            })
        }
    }


}
