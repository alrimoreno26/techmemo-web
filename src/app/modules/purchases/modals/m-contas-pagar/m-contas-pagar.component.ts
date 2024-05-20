import {Component, effect, OnInit} from "@angular/core";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";

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


    selected: any;

    fatura = 288.39;
    description = '';
    parcelas = false;
    qParcelas = 0;
    vencimiento = 'fixo';

    rangeDates: Date = new Date()
    listParcelas: any[] = []

    // Autocomplete classfiers
    selectedItem: any;
    searchText = '';
    suggestions: any[] = [];

    // Autocomplete forncedores
    selectedF: any;
    searchTextF = '';
    suggestionsF: any[] = [];

    constructor(private storeService: StoreContasPagarServices,
                public paymentMethodService: PaymentMethodService,
                private supplierService: SupplierService,
                private financeService: FinancialClasificationService) {
        super(storeService);
        this.paymentMethodService.loadAll({lazy: {pageNumber: 0, pageSize: 10}})
    }

    ngOnInit(): void {
        this.financeService.autocompleteSearch({
            pageNumber: 0,
            pageSize: 50,
        })
        this.supplierService.autocomplete({  pageNumber: 0,
            pageSize: 50,})
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

    search(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestions = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchF(event: AutoCompleteCompleteEvent) {
        if (this.supplierService.autocomplete$()) {
            this.suggestionsF = this.supplierService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchClassifiers(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.financeService.autocompleteSearch({
            filter: this.searchText,
        });
    }
    searchFornecedor(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.supplierService.autocomplete({
            filter: this.searchText,
        });
    }
}
