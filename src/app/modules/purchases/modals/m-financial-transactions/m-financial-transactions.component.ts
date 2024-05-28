import {Component, effect, HostListener, OnInit, ViewChild} from "@angular/core";
import {StorePurchasesServices} from "../../services/store.purchases.services";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {Stock_TransferStore} from "../../../inventory/stock_transfer/store/stock_transfer.store";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {
    MFornecedoresComponent
} from "../../../inventory/forncedores/components/m-fornecedores/m-fornecedores.component";
import {DialogService} from "primeng/dynamicdialog";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FinancialTransactionsServices} from "../../services/financial-transactions.services";
import {ProductService} from "../../../inventory/product/services/product.service";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";
import {MNewProductComponent} from "../m-new-product/m-new-product.component";
import {MProductComponent} from "../../../inventory/product/components/m-product/m-product.component";
import {cloneDeep} from "lodash";
import {InstallmentsComponent} from "../../components/c-installsments/installments.component";
import {BehaviorSubject} from "rxjs";

@Component({
    templateUrl: './m-financial-transactions.component.html',
    styleUrl: '/m-financial-transactions.component.scss',
})
export class MFinancialTransactionsComponent extends BaseModalStoreComponentDirective implements OnInit {

    @ViewChild(InstallmentsComponent) child!: InstallmentsComponent;
    stepActive = 0;

    // Autocomplete classfiers
    searchTextClassifiers = '';
    suggestionsClassifiers: any[] = [];

    // Autocomplete forncedores
    searchTextSuppliers = '';
    suggestionsSuppliers: any[] = [];

    // Autocomplete products
    selectedItem: any;
    selectedItemAmount: number = 1;
    searchTextProducts = '';
    suggestionsProducts: any[] = [];

    private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    products$ = this.productsSubject.asObservable();
    totalProducts = 0;

    data: any;


    constructor(private storeService: StorePurchasesServices,
                public supplierService: SupplierService,
                private productService: ProductService,
                public storeFinancialTransactions: FinancialTransactionsServices,
                private dialogService: DialogService,
                public paymentMethodService: PaymentMethodService,
                private dialogRegistryService: DialogRegistryService,
                private financeService: FinancialClasificationService,
                public stockTransferStore: Stock_TransferStore) {
        super(storeService);
        this.dialogRegistryService.addDialog(this.ref);
        this.products$.subscribe(products => {
            this.reduceTotalPayments();
        });
        if (!paymentMethodService.loaded$()) {
            this.paymentMethodService.loadAll({lazy: {pageNumber: 0, pageSize: 10}})
        }
        effect(() => {
            if (storeFinancialTransactions.goToPay$()) {
                this.data = {
                    ...storeFinancialTransactions.goToPay$(),
                    classifierId: this.form.get('classifierId')?.value.id,
                    supplierId: this.form.get('supplierId')?.value.id
                };
                this.stepActive++;
            }
        });
        effect(() => {
            if (this.storeService.selectedEntity$() !== undefined) {
                this.initForm(this.storeService.selectedEntity$());
            }
        });
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.financeService.autocompleteSearch({
            filter: this.searchTextSuppliers,
        });
        this.supplierService.autocomplete({
            filter: this.searchTextClassifiers,
        });
        this.initForm(data);
    }

    set products(products: any[]) {
        this.productsSubject.next(products);
    }

    get products(): any[] {
        return this.productsSubject.getValue();
    }

    initForm(data: any) {
        this.form = new FormGroup({
            id: new FormControl(data?.id),
            supplierId: new FormControl(data?.supplier, Validators.required),
            classifierId: new FormControl(data?.classifier, Validators.required),
            type: new FormControl({value: data?.type || 'EXPENSES', disabled: true}, Validators.required),
        });
        this.products = data?.products ?? [];
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'Enter':
                if (this.selectedItem !== undefined) {
                    const updatedProducts = [...this.products, {
                        ...this.selectedItem,
                        amount: this.selectedItemAmount,
                        valueToPaid: this.selectedItem.salePrice * this.selectedItemAmount
                    }];
                    this.products = updatedProducts;
                    this.selectedItem = undefined;
                    this.selectedItemAmount = 1;
                    this.form.get('products')?.setValue(this.products);
                    this.reduceTotalPayments();
                }
                break;
        }
    }

    novoProducto() {
        this.storeFinancialTransactions.openModalAddOrEdit();
        this.dialogService.open(MNewProductComponent, {}).onClose.subscribe((data: any) => {
            const updatedProducts = [...this.products, {
                name: data.data.productName,
                soldPerUnits: true,
                costPrice: data.data.value,
                amount: data.data.amount
            }];
            this.products = updatedProducts;
        });
    }

    addProduct() {
        this.productService.openModalAddOrEdit();
        this.dialogService.open(MProductComponent, {data: {suppliers: [this.form.get('supplierId')?.value]}}).onClose.subscribe((data: any) => {
            const temp = cloneDeep(this.productService.temporalCreated$());
            const updatedProducts = [...this.products, {
                name: temp.name,
                soldPerUnits: temp.soldPerUnits,
                costPrice: temp.costPrice,
                amount: temp.stockAmount
            }];
            this.products = updatedProducts;
        });
    }

    deleteProduct(product: number) {
        const index = this.products.findIndex(p => p.id === product);
        if (index !== -1) {
            const updatedProducts = [...this.products];
            updatedProducts.splice(index, 1);
            this.products = updatedProducts;
        }
    }


    supplier(id: string) {
        // @ts-ignore
        return this.supplierService.listEntities$().find(s => s.id === id);
    }

    addFornecedor() {
        this.supplierService.openModalAddOrEdit();
        this.dialogService.open(MFornecedoresComponent, {});
    }

    searchListProducts(event: AutoCompleteCompleteEvent) {
        if (this.productService.autocomplete$()) {
            this.suggestionsProducts = this.productService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchBills(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestionsClassifiers = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchSuppliers(event: AutoCompleteCompleteEvent) {
        if (this.supplierService.autocomplete$()) {
            this.suggestionsSuppliers = this.supplierService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchClassifiers(event: { target: { value: string; } } | any) {
        this.searchTextSuppliers = event.target.value;
        this.financeService.autocompleteSearch({
            filter: this.searchTextSuppliers,
        });
    }

    searchFornecedor(event: { target: { value: string; } } | any) {
        this.searchTextClassifiers = event.target.value;
        this.supplierService.autocomplete({
            filter: this.searchTextClassifiers,
        });
    }

    searchProduct(event: { target: { value: string; } } | any) {
        this.searchTextProducts = event.target.value;
        this.productService.autocomplete({
            filter: this.searchTextProducts,
        });
    }

    reduceTotalPayments() {
        this.totalProducts = this.products.reduce((acc, curr) => acc + (curr.costPrice * curr.amount), 0)
    }

    override save() {
        const send = {
            classifierId: this.form.get('classifierId')?.value.id,
            products: this.products.map((item: any) => {
                return {
                    amount: item.amount,
                    productId: item.id,
                    productName: item.name,
                    unitMeasurementId: item.unitMeasurementCode,
                    value: item.costPrice,
                    weight: item.weight,
                }
            }),
            supplierId: this.form.get('supplierId')?.value.id,
            type: this.form.get('type')?.value,
        }
        this.storeFinancialTransactions.create({data: send});
    }

    savePayment() {
        this.child.save();
    }

    confirmInstallment(event: any) {
        this.storeService.createInstallmentsByFinancialTransactions(event);
    }

    decreaseStepActive() {
        this.stepActive--;
    }
}
