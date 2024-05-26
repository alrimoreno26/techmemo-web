import {Component, effect, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {HeadersTable} from "../../../../standalone/data-table/models";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {MContasPagarComponent} from "../../modals/m-contas-pagar/m-contas-pagar.component";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {TableRowExpandEvent} from "primeng/table";
import {formatDate} from "../../../../core/util";
import {BillSummaryDto} from "../../../../core/models/bills";
import {MEditParcelasComponent} from "../../modals/m-edit-parcelas/m-edit-parcelas.component";

@Component({
    selector: 'c-contas-pagar',
    templateUrl: './contas-pagar.components.html',
})
export class ContasPagarComponents extends BaseComponentDirective implements OnInit {

    override modalContent = MContasPagarComponent;

    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth(), 31)];
    type: string = 'ALL';
    selectedItem: any;
    suggestions: any[] = [];

    searchText = '';

    first= 0;
    size= 20;
    totalValuePaid= 0;
    totalValueProvisionType= 0;
    totalValuePay= 0;
    totalValueToPay= 0;

    constructor(public service: StoreContasPagarServices, private financeService: FinancialClasificationService) {
        super()


        this.service.loadAll({
            pageNumber: this.first,
            pageSize: this.size,
            type: this.type,
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1])
        })
        effect(() => {
            console.log(this.service.listEntities$());
            if(this.service.summary$()){
                this.totalValuePaid= this.service.summary$().totalValuePaid;
                this.totalValueProvisionType= this.service.summary$().totalValueProvisionType;
                this.totalValuePay= this.service.summary$().totalValuePay;
                this.totalValueToPay= this.service.summary$().totalValueToPay;
            }
        });
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
        this.service.loadSummary();
    }

    novaConta() {
        this.service.openModalAddOrEdit();
        this.dialogService.open(MContasPagarComponent, {})
    }

    search(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestions = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    changeFilterType() {
        this.service.loadSummary();
        this.service.loadAll({
            type: this.type,
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1]),
            pageNumber: this.first,
            pageSize: this.size,
        })
    }

    pageChange(event:any) {
        this.size = event.rows;
        this.first = event.first;
        this.service.loadSummary();
        this.service.loadAll({
            type: this.type,
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1]),
            pageNumber: this.first,
            pageSize: this.size,
        })
    }

    searchClassifiers(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.financeService.autocompleteSearch({
            filter: this.searchText,
        });
    }

    onRowExpand(event: TableRowExpandEvent) {
        if (event.data.paymentInstallments.length === 0) {
            this.service.setSelected(event.data);
            const id = event.data.id;
            this.service.loadInstallmentsBill({billId: id, type: this.type, pageNumber: 0, pageSize: 50})
        }
    }

    containerClass(installments: any) {
        if (!installments.paid && !installments.provision) {
            return ''
        } else if (installments.provision && !installments.paid) {
            return 'bg-yellow-100'
        } else {
            return 'bg-green-100'
        }
    }
    contasClass(installments: any) {
     if (installments.provision) {
            return 'bg-yellow-100'
        } else {
            return ''
        }
    }

    editInstallment(contaId:any,installmment: any){
        this.service.openModalAddOrEdit();
        this.dialogService.open(MEditParcelasComponent,{
            data: {id: contaId, installmment: installmment}
        }).onClose.subscribe(() => {
            this.service.loadSummary();
        })
    }

}
