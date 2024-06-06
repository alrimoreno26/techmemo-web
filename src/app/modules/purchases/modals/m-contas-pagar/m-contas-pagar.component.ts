import {Component, effect, OnInit} from "@angular/core";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "../../../../core/util";
import {CreateBillPaymentInstallmentDto} from "../../../../core/models/bills";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-contas-pagar',
    templateUrl: './m-contas-pagar.component.html',
})
export class MContasPagarComponent extends BaseModalStoreComponentDirective implements OnInit {


    selected: any;

    consecutiveDaysPaymentInstallments: number = 1;
    purchaseValue: number = 0;
    description = '';
    parcelas = false;
    qParcelas = 0;
    mParcelas: boolean = false;
    totalPaymentsInstall: number = 0;

    rangeDates: Date = new Date()
    paymentInstallments: any[] = []

    // Autocomplete classfiers
    selectedItem: any;
    searchText = '';
    suggestions: any[] = [];

    // Autocomplete forncedores
    selectedF: any;
    searchTextF = '';
    suggestionsF: any[] = [];

    clonedProducts: { [s: string]: any } = {};
    editing: boolean = false;


    constructor(private storeService: StoreContasPagarServices,
                public paymentMethodService: PaymentMethodService,
                private supplierService: SupplierService,
                private dialogRegistryService: DialogRegistryService,
                private financeService: FinancialClasificationService) {
        super(storeService);
        this.dialogRegistryService.addDialog(this.ref);
        this.paymentMethodService.loadLight()
        this.editing = false;
        effect(() => {
            if (this.storeService.selectedEntity$()) {
                this.editing = true;

            }
            if (this.storeService.installments$() && this.editing) {
                this.initForm(this.storeService.selectedEntity$());
                this.purchaseValue = this.storeService.selectedEntity$()?.value ?? 0;
                this.paymentInstallments = this.storeService.selectedEntity$()?.paymentInstallments ?? [];
                this.paymentInstallments.length > 0 ? this.rangeDates = new Date(this.paymentInstallments[0].expirationDate+ 'T00:00') : this.rangeDates = new Date();
                this.qParcelas = this.paymentInstallments.length === 0 ? 1 : this.paymentInstallments.length;
                this.qParcelas > 1 ? this.mParcelas = true : this.parcelas = false;
            }
        });
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.initForm(data);

        this.financeService.autocompleteSearch({
            pageNumber: 0,
            pageSize: 50,
        })
        this.supplierService.autocomplete({
            pageNumber: 0,
            pageSize: 50,
        })
    }

    initForm(data: any) {
        this.selected = data;
        console.log(data?.paymentInstallments)
        this.form = new FormGroup({
            classifierId: new FormControl<string>(data?.classifier, Validators.required),
            description: new FormControl<string>(data?.description),
            monthlyPaymentInstallments: new FormControl<boolean>(data?.monthlyPaymentInstallments || true, Validators.required),
            paymentStructureId: new FormControl<string>(data?.paymentStructure, Validators.required),
            provision: new FormControl<boolean>(data?.provision || false, Validators.required),
            purchaseCode: new FormControl<string>({value: data?.code, disabled: true}),
            supplierId: new FormControl<string>(data?.supplier, Validators.required)
        });
        this.purchaseValue = data?.value ?? 0;
        this.paymentInstallments = data?.paymentInstallments ?? [];
        this.paymentInstallments.length > 0 ? this.rangeDates = new Date(this.paymentInstallments[0].expirationDate) : this.rangeDates = new Date();
        this.qParcelas = this.paymentInstallments.length === 0 ? 1 : this.paymentInstallments.length;
        this.qParcelas > 1 ? this.mParcelas = true : this.parcelas = false;
    }

    getFC(key: string) {
        return this.form.get(key)?.value;
    }

    gerarParcelas() {
        if (this.mParcelas) {
            this.paymentInstallments = [];
            let monthlyPayment = 0;
            if (this.purchaseValue > 0) {
                monthlyPayment = this.purchaseValue / this.qParcelas;
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
                    code: null,
                    value: monthlyPayment,
                    expirationDate: tempDate,
                    description: this.description
                })
            }
        } else {
            this.paymentInstallments.push({
                code: null,
                value: 0,
                expirationDate: this.rangeDates.setMonth(this.rangeDates.getMonth() + 1),
                description: this.description,
            })
        }
        this.reduceTotalPaymentsInstall();
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

    onRowEditSave(product: any) {
        if (product.value > 0) {
            if(this.editing){
                this.storeService.saveInstallmentsBillBackground(this.selected.id,product.id, product);
            }
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

    override save() {
        if (this.form.valid) {
            const bills = {
                classifierId: this.form.get('classifierId')?.value.id,
                description: this.form.get('description')?.value,
                monthlyPaymentInstallments: this.form.get('monthlyPaymentInstallments')?.value,
                paymentInstallments: this.paymentInstallments.map((item: CreateBillPaymentInstallmentDto) => {
                    return {...item, expirationDate: formatDate(new Date(item.expirationDate))}
                }),
                paymentStructureId: this.form.get('paymentStructureId')?.value?.id,
                provision: this.form.get('provision')?.value,
                purchaseCode: this.form.get('purchaseCode')?.value,
                consecutiveDaysPaymentInstallments: this.form.get('monthlyPaymentInstallments')?.value ? null : this.consecutiveDaysPaymentInstallments,
                supplierId: this.form.get('supplierId')?.value.id,
            }

            this.storeService.create({data: bills});
        }

    }

    validatePaymentInstallments(): boolean {
        for (const installment of this.paymentInstallments) {
            if (installment.value <= 0) {
                return false;
            }
        }
        return true;
    }
}
