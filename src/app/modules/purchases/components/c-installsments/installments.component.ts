import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateBillPaymentInstallmentDto} from "../../../../core/models/bills";
import {formatDate} from "../../../../core/util";
import {FinancialTransactionsServices} from "../../services/financial-transactions.services";

@Component({
    selector: 'c-installments',
    templateUrl: './installments.component.html',
    styles: [`
        ::ng-deep .p-dialog .p-dialog-content {
            padding: 0 1.5rem 0 1.5rem;
        }
        ::ng-deep .p-datatable-wrapper {
            min-height: 300px;
            max-height: 500px;
        }
    `]
})
export class InstallmentsComponent implements OnInit {

    @Input() config: any;
    @Output() confirmInstallment: EventEmitter<any> = new EventEmitter<any>()
    form: FormGroup;

    selected: any;

    purchaseValue: number = 0;
    description = '';
    parcelas = false;
    qParcelas = 0;
    mParcelas: boolean = false;
    totalPaymentsInstall: number = 0;

    rangeDates: Date = new Date()
    paymentInstallments: any[] = []


    clonedProducts: { [s: string]: any } = {};


    constructor( public paymentMethodService: PaymentMethodService) {
        this.paymentMethodService.loadLight()
    }

    ngOnInit(): void {

        this.form = new FormGroup({
            classifierId: new FormControl<string>(this.config?.classifierId, Validators.required),
            description: new FormControl<string>(this.config?.paymentInstallments?.description),
            monthlyPaymentInstallments: new FormControl<boolean>(this.config?.monthlyPaymentInstallments || true, Validators.required),
            paymentStructureId: new FormControl<any>(this.config?.paymentInstallments?.paymentStructure, Validators.required),
            provision: new FormControl<boolean>(this.config?.paymentInstallments?.provision || false, Validators.required),
            purchaseCode: new FormControl<string>({value: this.config?.code, disabled: true}),
            purchaseValue: new FormControl<string>({value: this.config?.totalValue, disabled: true}),
            supplierId: new FormControl<string>(this.config?.supplierId, Validators.required)
        });
        this.paymentInstallments = this.config?.paymentInstallments?.paymentInstallments ?? [];
        this.paymentInstallments.length > 0 ? this.rangeDates = new Date(this.paymentInstallments[0].expirationDate+ 'T00:00') : this.rangeDates = new Date();
        this.qParcelas = this.paymentInstallments.length === 0 ? 1 : this.paymentInstallments.length;
        this.qParcelas > 0 ? this.mParcelas = true : this.parcelas = false;
        this.reduceTotalPaymentsInstall();
    }

    getFC(key: string) {
        return this.form.get(key)?.value;
    }

    gerarParcelas() {
        if (this.mParcelas) {
            this.paymentInstallments = [];
            let monthlyPayment = 0;
            if (this.form.get('purchaseValue')?.value > 0) {
                monthlyPayment = this.form.get('purchaseValue')?.value / this.qParcelas;
            }

            let currentDate = this.rangeDates;
            for (let i = 0; i < this.qParcelas; i++) {

                if (!this.form.get('monthlyPaymentInstallments')?.value) {
                    currentDate.setDate(currentDate.getDate() + 1);
                } else {
                    if (i !== 0) {
                        currentDate.setMonth(currentDate.getMonth() + 1);
                    }

                }
                let tempDate = new Date(currentDate);
                this.paymentInstallments.push({
                    code: this.form.get('purchaseCode')?.value,
                    value: monthlyPayment,
                    expirationDate: tempDate,
                    description: this.description
                })
            }
        } else {
            this.paymentInstallments.push({
                code: this.form.get('purchaseCode')?.value,
                value: 0,
                expirationDate: this.rangeDates.setMonth(this.rangeDates.getMonth() + 1),
                description: this.description,
            })
        }
        this.reduceTotalPaymentsInstall();
    }


    addParcela() {
        const parcela: any = {
            value: 0,
            expirationDate: new Date(),
            description: '',
        }
        this.paymentInstallments.push(parcela)
        this.onRowEditInit(parcela)

    }

    onRowEditInit(product: any) {
        this.clonedProducts[product.id as string] = {...product};
    }

    deleteRow(product: any) {
        const index = this.paymentInstallments.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.paymentInstallments.splice(index, 1);
        }
        delete this.clonedProducts[product.id as string];

        this.reduceTotalPaymentsInstall();  //
    }

    onRowEditSave(product: any) {
        if (product.price > 0) {
            delete this.clonedProducts[product.id as string];
            console.log({severity: 'success', summary: 'Success', detail: 'Product is updated'});
        } else {
            console.log({severity: 'error', summary: 'Error', detail: 'Invalid Price'});
        }
        this.reduceTotalPaymentsInstall();
    }

    onRowEditCancel(product: any, index: number) {
        this.paymentInstallments[index] = this.clonedProducts[product.id as string];
        delete this.clonedProducts[product.id as string];
        this.reduceTotalPaymentsInstall();
    }

    reduceTotalPaymentsInstall() {
        this.totalPaymentsInstall = this.paymentInstallments.reduce((acc, curr) => acc + curr.value, 0)
    }

    save() {
        if (this.form.valid) {
            const bills = {
                classifierId: this.form.get('classifierId')?.value,
                description: this.form.get('description')?.value,
                financialTransactionId: this.config?.id,
                monthlyPaymentInstallments: this.form.get('monthlyPaymentInstallments')?.value,
                paymentInstallments: this.paymentInstallments.map((item: CreateBillPaymentInstallmentDto) => {
                    return {...item, expirationDate: formatDate(new Date(item.expirationDate))}
                }),
                paymentStructureId: this.form.get('paymentStructureId')?.value?.id,
                provision: this.form.get('provision')?.value,
                purchaseCode: this.form.get('purchaseCode')?.value,
                supplierId: this.form.get('supplierId')?.value,
                editing: !!this.config
            }

            this.confirmInstallment.next(bills);
        }
    }
}
