import {Component, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {HeadersTable} from "../../../../standalone/data-table/models";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {MContasPagarComponent} from "../../modals/m-contas-pagar/m-contas-pagar.component";
import {FinancialClassifiersService} from "../../../../core/services/financial-classifiers.service";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {TableRowCollapseEvent, TableRowExpandEvent} from "primeng/table";

@Component({
    selector: 'c-contas-pagar',
    templateUrl: './contas-pagar.components.html',
})
export class ContasPagarComponents extends BaseComponentDirective implements OnInit {

    override modalContent = MContasPagarComponent;

    apagar = 0;
    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), 11, 31)];
    type: string = 'ALL';
    selectedItem: any;
    suggestions: any[] = [];

    searchText = '';

    expandedRows = {};

    constructor(public service: StoreContasPagarServices, private financeService: FinancialClasificationService) {
        super()
        this.service.loadAll({pageNumber: 0, pageSize: 50})
    }

    override headersTable: HeadersTable[] = [
        {header: 'Documento', field: 'purchaseCode', class: 'text-center', visible: true},
        {header: '# Parcelas', field: 'amountPaymentInstallments', class: 'text-center', visible: true},
        {header: '1er Parcela', field: 'firstPaymentInstallmentDate', class: 'text-center', visible: true},
        {header: 'Parcela Fixas', field: 'monthlyPaymentInstallments', class: 'text-center', visible: true},
        {header: 'Valor Total Parcelas', field: 'purchaseValue', pipe: 'currency', class: 'text-center', visible: true},
        {header: 'Ações', field: 'action', class: 'text-center', visible: true}
    ];

    ngOnInit() {
    }

    novaConta(){
        this.service.openModalAddOrEdit();
        this.dialogService.open(MContasPagarComponent, {})
    }

    search(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestions = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    changeFilterType() {
        this.service.loadAll({type: this.type, pageNumber: 0, pageSize: 50})
    }

    searchClassifiers(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.financeService.autocompleteSearch({
            filter: this.searchText,
        });
    }

    onRowExpand(event: TableRowExpandEvent) {
        if(event.data.paymentInstallments.length === 0) {
            this.service.setSelected(event.data);
            const id = event.data.id;
            this.service.loadInstallmentsBill({billId: id, type: this.type, pageNumber: 0, pageSize: 50})
        }
    }

    containerClass(installments: any){
        if(!installments.paid && !installments.provision) {
            return ''
        } else if(installments.provision && !installments.paid) {
            return 'bg-yellow-100'
        }
        else {
            return 'bg-green-100'
        }

    }

}
