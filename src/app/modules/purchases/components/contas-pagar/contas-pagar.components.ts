import {Component, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {HeadersTable} from "../../../../standalone/data-table/models";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {MContasPagarComponent} from "../../modals/m-contas-pagar/m-contas-pagar.component";
import {FinancialClassifiersService} from "../../../../core/services/financial-classifiers.service";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";

@Component({
    selector: 'c-contas-pagar',
    templateUrl: './contas-pagar.components.html',
})
export class ContasPagarComponents extends BaseComponentDirective implements OnInit{

    override modalContent = MContasPagarComponent;

    apagar = 0;
    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), 11, 31)];
    ingredient!: string;
    selectedItem: any;
    suggestions: any[] = [];

    searchText = '';

    constructor(public service: StoreContasPagarServices, private financeService: FinancialClasificationService) {
        super()

    }

    override headersTable: HeadersTable[] = [
        {header: 'Parcela', field: 'name', class: 'text-center', visible: true},
        {header: 'Documento', field: 'code', class: 'text-center', visible: true},
        {header: 'Data Vencimento', field: 'type', class: 'text-center', visible: true},
        {header: 'Valor Parcela', field: 'costPrice', pipe: 'currency', class: 'text-center', visible: true},
        {header: 'Valor Restante', sort: true, field: 'cfop', class: 'text-center', visible: true},
        {header: 'Fornecedor', field: 'created', class: 'text-center', visible: true},
        {header: 'CPF/CNPJ', field: 'action', class: 'text-center', visible: true}
    ];

    ngOnInit() {
    }

    search(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestions = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchClassifiers(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.financeService.autocompleteSearch({
            filter: this.searchText,
        });
    }
}
