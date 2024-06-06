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
import {dA} from "@fullcalendar/core/internal-common";
import {isNull, omitBy} from "lodash";

@Component({
    selector: 'c-contas-pagar',
    templateUrl: './contas-pagar.components.html',
    styles: [`
        ::ng-deep{
            .parent-select > div:nth-child(1),
            .parent-select > div:nth-child(2) {
                flex: 1;
            }
            div#pn_id_5-titlebar {
                padding: 10px !important;
            }
            #pn_id_5_content .p-panel-content {
                padding: 5px !important;
            }
            #tableParcelas .p-datatable-wrapper,
            #tableContas .p-datatable-wrapper, {
                height: calc(100vh - 380px) !important;
            }
        }
    `]
})
export class ContasPagarComponents extends BaseComponentDirective implements OnInit {

    override modalContent = MContasPagarComponent;

    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth(), 31)];
    type: string = 'ALL';
    selectedItem: any;
    selectedInstallements: any;
    suggestions: any[] = [];

    searchText = '';

    first = 0;
    size = 20;
    firstInstallement = 0;
    sizeInstallment = 20;
    totalValuePaid = 0;
    totalValueProvisionType = 0;
    totalValuePay = 0;
    totalValueToPay = 0;

    viewOptions = [{label: 'Contas', value: 'contas'}, {label: 'Parcelas', value: 'parcelas'}];
    viewPaymentOptions = [{label: 'Descontar', value: '-'}, {label: 'Acrescimo', value: '+'}];
    viewState = 'contas'
    viewPayment = '-'
    openDialog = false;
    visible = false;

    constructor(public service: StoreContasPagarServices,
                private financeService: FinancialClasificationService,
                private confirmationService: ConfirmServices) {
        super()
        let data =
            omitBy({
                state: this.type === 'ALL' ? null : this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1]),
                pageNumber: this.first,
                pageSize: this.size,
            }, isNull);
        this.service.loadAll(data)
        effect(() => {
            if (!this.service.dialog$() && this.openDialog) {
                this.service.loadAllInstallments({
                    type: this.type,
                    pageNumber: this.firstInstallement,
                    pageSize: this.sizeInstallment,
                    startDate: formatDate(this.rangeDates[0]),
                    endDate: formatDate(this.rangeDates[1])
                })
            }
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
            let data =
                omitBy({
                    state: this.type === 'ALL' ? null : this.type,
                    startDate: formatDate(this.rangeDates[0]),
                    endDate: formatDate(this.rangeDates[1]),
                    pageNumber: this.first,
                    pageSize: this.size,
                }, isNull);
            this.service.loadAll(data)
        } else {
            this.service.loadAllInstallments({
                type: this.type,
                pageNumber: this.firstInstallement,
                pageSize: this.sizeInstallment,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1])
            })
        }

    }

    novaConta() {
        this.service.openModalAddOrEdit();
        this.dialogService.open(MContasPagarComponent, {})
    }

    refreshContentData() {
        if (this.viewState === 'contas') {
            this.service.loadSummary();
            let data =
                omitBy({
                    state: this.type === 'ALL' ? null : this.type,
                    startDate: formatDate(this.rangeDates[0]),
                    endDate: formatDate(this.rangeDates[1]),
                    pageNumber: this.first,
                    pageSize: this.size,
                }, isNull);
            this.service.loadAll(data)
        } else {
            this.service.loadAllInstallments({
                type: this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1]),
                pageNumber: this.firstInstallement,
                pageSize: this.sizeInstallment,
            })
        }
    }

    search(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestions = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    changeFilterType() {
        if (this.viewState === 'contas') {
            if (this.type === 'PROVISION') {
                this.service.loadAll({
                    provision: true,
                    startDate: formatDate(this.rangeDates[0]),
                    endDate: formatDate(this.rangeDates[1]),
                    pageNumber: this.first,
                    pageSize: this.size,
                })
            } else {
                let data =
                    omitBy({
                        state: this.type === 'ALL' ? null : this.type,
                        startDate: formatDate(this.rangeDates[0]),
                        endDate: formatDate(this.rangeDates[1]),
                        pageNumber: this.first,
                        pageSize: this.size,
                    }, isNull);
                this.service.loadAll(data)
            }
        } else {
            this.service.loadAllInstallments({
                type: this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1]),
                pageNumber: this.firstInstallement,
                pageSize: this.sizeInstallment,
            })
        }


    }

    pageChange(event: any) {
        this.size = event.rows;
        this.first = event.first;
        this.service.loadSummary();
        let data =
            omitBy({
                state: this.type === 'ALL' ? null : this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1]),
                pageNumber: this.first,
                pageSize: this.size,
            }, isNull);
        this.service.loadAll(data)
    }

    pageChangeInstallement(event: any) {
        this.sizeInstallment = event.rows;
        this.firstInstallement = event.first;
        this.service.loadSummary();
        this.service.loadAllInstallments({
            type: this.type,
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1]),
            pageNumber: this.firstInstallement,
            pageSize: this.sizeInstallment,
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
        this.openDialog = true;
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
        this.service.openModalAddOrEdit();
        this.dialogService.open(MEditParcelasComponent, {
            data: {id: null, installmment: bills}
        }).onClose.subscribe(() => {
            console.log('entre')
            this.service.loadSummary();
            this.service.loadAllInstallments({
                type: this.type,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1]),
                pageNumber: this.firstInstallement,
                pageSize: this.sizeInstallment,
            })
        })
    }

    payInstallments(bills: any) {
        this.selectedInstallements = {
            ...bills,
            paymentValue: bills.value,
            discountValue: 0,
            addedValue: 0,
            expirationDate: new Date(bills.expirationDate)
        };
        console.log(this.selectedInstallements)
        this.visible = true;
    }

    calculatePaymentValue(event: any) {
        if (this.viewPayment === '-') {
            this.selectedInstallements.paymentValue = this.selectedInstallements.value - event
        } else {
            this.selectedInstallements.paymentValue = this.selectedInstallements.value + event
        }
    }

    changeOptionsState(){
        if (this.viewPayment === '-') {
            this.selectedInstallements.paymentValue = this.selectedInstallements.value - this.selectedInstallements.addedValue
        } else {
            this.selectedInstallements.paymentValue = this.selectedInstallements.value + this.selectedInstallements.addedValue
        }
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
