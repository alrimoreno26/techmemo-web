import {Component, effect, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {HeadersTable} from "../../../../standalone/data-table/models";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {MContasPagarComponent} from "../../modals/m-contas-pagar/m-contas-pagar.component";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {TableRowExpandEvent} from "primeng/table";
import {formatDate} from "../../../../core/util";
import {MEditParcelasComponent} from "../../modals/m-edit-parcelas/m-edit-parcelas.component";
import {takeUntil} from "rxjs";
import {confirmDialog} from "../../../../core/rx/confirm";
import {ConfirmServices} from "../../../../core/injects/confirm.services";

@Component({
    selector: 'c-contas-pagar',
    templateUrl: './contas-pagar.components.html',
    styles: [`
        ::ng-deep div#pn_id_5-titlebar {
            padding: 10px !important;
        }

        ::ng-deep #pn_id_5_content .p-panel-content {
            padding: 5px !important;
        }
    `]
})
export class ContasPagarComponents extends BaseComponentDirective implements OnInit {

    override modalContent = MContasPagarComponent;

    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth(), 31)];
    type: string = 'ALL';
    selectedItem: any;
    suggestions: any[] = [];

    searchText = '';

    first = 0;
    size = 20;
    totalValuePaid = 0;
    totalValueProvisionType = 0;
    totalValuePay = 0;
    totalValueToPay = 0;

    viewOptions = [{label: 'Contas', value: 'contas'}, {label: 'Parcelas', value: 'parcelas'}];
    viewState = 'contas'

    constructor(public service: StoreContasPagarServices,
                private financeService: FinancialClasificationService,
                private confirmationService: ConfirmServices) {
        super()

        this.service.loadAll({
            pageNumber: this.first,
            pageSize: this.size,
            type: this.type,
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1])
        })
        effect(() => {
            if (this.service.summary$()) {
                this.totalValuePaid = this.service.summary$().totalValuePaid;
                this.totalValueProvisionType = this.service.summary$().totalValueProvisionType;
                this.totalValuePay = this.service.summary$().totalValuePay;
                this.totalValueToPay = this.service.summary$().totalValueToPay;
            }
        });
    }

    override headersTable: HeadersTable[] = [
        {header: 'Documento', field: 'code', class: 'text-center', visible: true},
        {header: '# Parcelas', field: 'amountPaymentInstallments', class: 'text-center', visible: true},
        {header: '1er Parcela', field: 'firstPaymentInstallmentDate', class: 'text-center', visible: true},
        {header: 'Parcela Fixas', field: 'monthlyPaymentInstallments', class: 'text-center', visible: true},
        {header: 'Valor Total Parcelas', field: 'value', pipe: 'currency', class: 'text-center', visible: true},
        {header: 'Ações', field: 'action', class: 'text-center', visible: true}
    ];

    ngOnInit() {
        this.service.loadSummary();
    }

    changeViewState() {
        if (this.viewState === 'contas') {
            this.service.loadAll({
                pageNumber: this.first,
                pageSize: this.size,
                type: this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1])
            })
        } else {
            this.service.loadAllInstallments({type: this.type, pageNumber: 0, pageSize: 50})
        }

    }

    novaConta() {
        this.service.openModalAddOrEdit();
        this.dialogService.open(MContasPagarComponent, {})
    }

    refreshContentData() {
        this.service.loadSummary();
        this.service.loadAll({
            pageNumber: this.first,
            pageSize: this.size,
            type: this.type,
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1])
        })
    }

    search(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestions = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    changeFilterType() {
        if (this.type === 'PROVISION') {
            this.service.loadAll({
                provision: true,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1]),
                pageNumber: this.first,
                pageSize: this.size,
            })
        } else {
            this.service.loadAll({
                type: this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1]),
                pageNumber: this.first,
                pageSize: this.size,
            })
        }

    }

    pageChange(event: any) {
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
        //if (event.data.paymentInstallments.length === 0) {
        this.service.setSelected(event.data);
        const id = event.data.id;
        this.service.loadInstallmentsBill({billId: id, type: this.type, pageNumber: 0, pageSize: 50})
        //}
    }

    editConta(conta: any) {
        this.service.setSelected(conta);
        const id = conta.id;
        this.service.editContaInstallment({billId: id, type: this.type, pageNumber: 0, pageSize: 50})
        this.service.openModalAddOrEdit();
        this.dialogService.open(MContasPagarComponent, {}).onClose.subscribe(() => {
            this.service.loadSummary()
            this.service.resetState()
        })

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

    editInstallment(contaId: any, installmment: any) {
        this.service.openModalAddOrEdit();
        this.dialogService.open(MEditParcelasComponent, {
            data: {id: contaId, installmment: installmment}
        }).onClose.subscribe(() => {
            this.service.loadSummary();
        })
    }

    deleteInstallment(contaId: any, installmment: any) {
        this.confirmationService.confirm(
            'security.user.messages.confirmation',
            'security.user.messages.message'
        ).pipe(
            takeUntil(this.ngUnsubscribe),
            confirmDialog(() => this.service.deleteInstallmentsBill(contaId, installmment.id))
        ).subscribe();
    }

    editSimpleInstallment(bills: any) {

    }

    deleteSimpleInstallment(bills: any) {
        this.confirmationService.confirm(
            'security.user.messages.confirmation',
            'security.user.messages.message'
        ).pipe(
            takeUntil(this.ngUnsubscribe),
            confirmDialog(() => this.service.deleteSimpleInstallments(bills.id))
        ).subscribe();
    }


}
