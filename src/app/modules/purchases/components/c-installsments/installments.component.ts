import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateBillPaymentInstallmentDto} from "../../../../core/models/bills";
import {formatDate} from "../../../../core/util";
import {FinancialTransactionsServices} from "../../services/financial-transactions.services";
import {StorePurchasesServices} from "../../services/store.purchases.services";

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
    @Input() totalProducts: any;
    @Output() confirmInstallment: EventEmitter<any> = new EventEmitter<any>()
    form: FormGroup;

    selected: any;

    consecutiveDaysPaymentInstallments: number = 1;
    purchaseValue: number = 0;
    description = '';
    parcelas = false;
    qParcelas = 0;
    mParcelas: boolean = true;
    totalPaymentsInstall: number = 0;

    rangeDates: Date = new Date()
    paymentInstallments: any[] = []


    clonedProducts: { [s: string]: any } = {};


    constructor(public paymentMethodService: PaymentMethodService, private storeService: StorePurchasesServices) {
        this.paymentMethodService.loadLight()
        effect(() => {
            if (this.storeService.selectedEntity$() !== undefined) {
                this.paymentInstallments = this.storeService.selectedEntity$()?.paymentInstallments?.paymentInstallments ?? [];
                this.paymentInstallments.length > 0 ? this.rangeDates = new Date(this.paymentInstallments[0].expirationDate + 'T00:00') : this.rangeDates = new Date();
                this.qParcelas = this.paymentInstallments.length === 0 ? 1 : this.paymentInstallments.length;
                this.reduceTotalPaymentsInstall();
            }
        });
    }

    ngOnInit(): void {
        console.log(this.config)
        this.form = new FormGroup({
            classifierId: new FormControl<string>(this.config?.classifierId, Validators.required),
            description: new FormControl<string>(this.config?.paymentInstallments?.description),
            monthlyPaymentInstallments: new FormControl<boolean>(this.config?.monthlyPaymentInstallments || true, Validators.required),
            paymentStructureId: new FormControl<any>(this.config?.paymentInstallments?.paymentStructure, Validators.required),
            provision: new FormControl<boolean>(this.config?.paymentInstallments?.provision || false, Validators.required),
            purchaseCode: new FormControl<string>({value: this.config?.code, disabled: true}),
            purchaseValue: new FormControl<string>({value: this.totalProducts, disabled: true}),
            supplierId: new FormControl<string>(this.config?.supplierId)
        });
        this.paymentInstallments = this.config?.paymentInstallments?.paymentInstallments ?? [];
        this.paymentInstallments.length > 0 ? this.rangeDates = new Date(this.paymentInstallments[0].expirationDate + 'T00:00') : this.rangeDates = new Date();
        this.qParcelas = this.paymentInstallments.length === 0 ? 1 : this.paymentInstallments.length;
        // this.qParcelas > 0 ? this.mParcelas = true : this.parcelas = false;
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
                    currentDate.setDate(currentDate.getDate() + this.consecutiveDaysPaymentInstallments);
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
        this.save()
    }


    addParcela() {
        const parcela: any = {
            code: this.form.get('purchaseCode')?.value,
            value: 0,
            expirationDate: new Date(),
            description: '',
        }
        this.storeService.addSingleInstallment({
            billId: this.config?.billId,
            type: this.config?.type,
            installments: [parcela]
        }).subscribe((data) => {
            console.log(data)
            if (data) {
                this.paymentInstallments = data.paymentInstallments;
                this.qParcelas = data.paymentInstallments.length;
                this.onRowEditInit(parcela)
            }

        })


    }

    onRowEditInit(product: any) {
        this.clonedProducts[product.id as string] = {...product};
        this.reduceTotalPaymentsInstall();  //
    }

    deleteRow(product: any) {
        const index = this.paymentInstallments.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.storeService.deleteSingleInstallment({
                id: this.paymentInstallments[index].id,
                billId: this.config?.billId
            }).subscribe(() => {
                this.paymentInstallments.splice(index, 1);
                delete this.clonedProducts[product.id as string];
                this.qParcelas--;
                this.reduceTotalPaymentsInstall();  //
            })

        }

    }

    onRowEditSave(product: any) {
        if (product.value > 0) {
            this.storeService.updatedInstallmentsBill(
                product.id,
                {value: product.value},
                this.config?.billId
            ).subscribe((result) => {
                console.log(result)
                delete this.clonedProducts[product.id as string];
            });
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
                type: this.config?.type,
                financialTransactionId: this.config?.id,
                monthlyPaymentInstallments: this.form.get('monthlyPaymentInstallments')?.value,
                consecutiveDaysPaymentInstallments: this.form.get('monthlyPaymentInstallments')?.value ? null : this.consecutiveDaysPaymentInstallments,
                originalPaymentInstallments: this.config?.paymentInstallments,
                billId: this.config?.billId,
                paymentInstallments: this.paymentInstallments.map((item: CreateBillPaymentInstallmentDto) => {
                    return {...item, expirationDate: formatDate(new Date(item.expirationDate))}
                }),
                paymentStructureId: this.form.get('paymentStructureId')?.value?.id,
                provision: this.form.get('provision')?.value,
                purchaseCode: this.form.get('purchaseCode')?.value,
                supplierId: this.form.get('supplierId')?.value,
                editing: !!this.config
            }

            this.storeService.createInstallmentsByFinancialTransactions(bills);
            //this.confirmInstallment.next(bills);
        }
    }
}
