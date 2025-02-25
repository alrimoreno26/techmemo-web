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
import {BehaviorSubject, takeUntil} from "rxjs";
import {ToastMessageService} from "../../../../core/injects/toast-message.service";
import {CommercesService} from "../../../shops/service/commerces.service";
import {confirmDialog} from "../../../../core/rx/confirm";
import {ConfirmServices} from "../../../../core/injects/confirm.services";

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
    editing: boolean = false


    constructor(private storeService: StorePurchasesServices,
                public supplierService: SupplierService,
                private productService: ProductService,
                public storeFinancialTransactions: FinancialTransactionsServices,
                private dialogService: DialogService,
                public paymentMethodService: PaymentMethodService,
                private dialogRegistryService: DialogRegistryService,
                private commercesService: CommercesService,
                private financeService: FinancialClasificationService,
                private toastMessageService: ToastMessageService,
                private confirmationService: ConfirmServices,
                public stockTransferStore: Stock_TransferStore) {
        super(storeService);
        this.dialogRegistryService.addDialog(this.ref);
        this.products$.subscribe(products => {
            this.reduceTotalPayments();
        });
        if (!paymentMethodService.loaded$()) {
            this.paymentMethodService.loadAll({lazy: {pageNumber: 0, pageSize: 10}})
        }
        effect(() => this.handleGoToPayEffect());
        effect(() => this.handleSelectedEntityEffect());
        effect(() => this.handleListProductSelectedEffect());
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.financeService.autocompleteSearch({
            pageNumber: 0,
            pageSize: 1000,
            filter: this.searchTextSuppliers,
        });
        if (data?.type === 'EXPENSES') {
            this.supplierService.autocomplete({
                filter: this.searchTextClassifiers,
            });
        } else {
            this.commercesService.autocomplete({
                filter: this.searchTextClassifiers,
            });
        }
        this.initForm(data);
    }

    handleGoToPayEffect(): void {
        let goToPay = this.storeFinancialTransactions.goToPay$();
        if (goToPay) {
            this.handleGoToPay(goToPay);
        }
        if (this.storeFinancialTransactions.approvedEnd$()) {
            this.closingModal()
        }
    }

    handleSelectedEntityEffect(): void {
        let selectedEntity = this.storeService.selectedEntity$();
        if (selectedEntity) {
            this.handleSelectedEntity(selectedEntity);
        }
    }

    handleListProductSelectedEffect(): void {
        let listProductSelected = this.storeService.listProductSelected$();
        if (listProductSelected && listProductSelected.length > 0) {
            this.handleListProductSelected(listProductSelected);
        }
    }

    handleGoToPay(goToPay: any): void {
        let goToPayBillId = goToPay.billId || '';
        let classifierId = this.getFormValueId('classifierId');
        let supplierId = this.getFormValueId('supplierId');
        this.reduceTotalPayments();
        this.data = {
            ...goToPay,
            paymentInvoice: this.totalProducts,
            billsId: goToPayBillId,
            classifierId: classifierId,
            supplierId: supplierId
        };
        this.form.get('id')?.setValue(goToPay.id);
        this.stepActive++;
    }


    handleSelectedEntity(selectedEntity: any): void {
        this.editing = true;
        this.initForm(selectedEntity);
    }

    handleListProductSelected(listProductSelected: any[]): void {
        const groupedProducts = listProductSelected.reduce((acc, item) => {
            if (item.productId === null) {
                acc[`null_${Math.random()}`] = {...item, amount: item.amount || 0}; // Genera una clave única para cada producto con id null
            } else {
                if (!acc[item.productId]) {
                    acc[item.productId] = {...item, amount: 0};
                }
                acc[item.productId].amount += item.amount;
            }
            return acc;
        }, {});

        this.products = Object.values(groupedProducts).map(item => this.mapItemToProduct(item)) ?? [];
    }

    onProductChange() {
        setTimeout(() => {
            this.reduceTotalPayments();
        }, 100);

    }

    mapItemToProduct(item: any): any {
        return {
            id: item.productId,
            productName: item.productName,
            soldPerUnits: item.unitMeasurementCode === null,
            value: item.value,
            amount: item.amount
        }
    }

    getFormValueId(formControlName: string): string {
        return this.form.get(formControlName)?.value.id;
    }


    override ngOnDestroy() {
        this.storeService.resetState();
    }

    closingModal(): void {
        const type = this.form.get('type')?.value;
        const executeClose = () => {
            this.ref.close();
            this.storeService.resetState();
            this.storeService.loadAll({ pageNumber: 0, pageSize: 50, type });
        };

        if (this.form.dirty || this.products.length > 0) {
            this.confirmationService
                .confirm('security.user.messages.confirmation', 'security.financial.confirm')
                .pipe(
                    takeUntil(this.ngUnsubscribe),
                    confirmDialog(executeClose)
                )
                .subscribe();
        } else {
            executeClose();
        }
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
            supplierId: new FormControl(data?.supplier),
            commerceId: new FormControl(data?.supplier),
            classifierId: new FormControl(data?.classifier, Validators.required),
            type: new FormControl({value: data?.type || 'EXPENSES', disabled: true}, Validators.required),
        });
        if (this.editing) {
            this.data = cloneDeep(data);
            this.data.billsId = this.storeService.selectedEntity$()?.billId || null;
            this.data.classifierId = this.form.get('classifierId')?.value.id;
            this.data.supplierId = this.form.get('supplierId')?.value.id;
            this.data.commerceId = this.form.get('supplierId')?.value.i;
            console.log(this.data)
        }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'Enter':
                if (this.suggestionsProducts.length > 0) {
                    if (this.selectedItem !== undefined) {
                        const tempProduct = {
                            productName: this.selectedItem.name,
                            id: this.selectedItem.id,
                            soldPerUnits: this.selectedItem.soldPerUnits,
                            value: this.selectedItem.avgCostPrice,
                            amount: this.selectedItemAmount
                        };
                        if (this.editing) {
                            this.storeFinancialTransactions.addFinancialTransactionProduct(
                                this.form.get('id')?.value,
                                [tempProduct])
                                .subscribe((response) => {
                                    this.storeService.setListProductSelected(response)
                                    this.storeService.loadAll({
                                        pageNumber: 0,
                                        pageSize: 50,
                                        type: this.form.get('type')?.value
                                    });
                                });
                        } else {
                            // Verificar si el producto ya existe en el array
                            const existingProductIndex = this.products.findIndex(product => product.id === tempProduct.id);

                            if (existingProductIndex !== -1) {
                                // Si el producto ya existe, aumentar la cantidad
                                this.products[existingProductIndex].amount += tempProduct.amount;
                            } else {
                                // Si el producto no existe, agregarlo al array
                                this.products = [...this.products, tempProduct];
                            }

                        }
                        this.selectedItem = undefined;
                        this.selectedItemAmount = 1;
                        this.form.get('products')?.setValue(this.products);
                        this.reduceTotalPayments();
                    }
                }
                break;
        }
    }

    openNewProductModal() {
        this.openProductModal(MNewProductComponent, {});
    }

    addProduct() {
        this.productService.openModalAddOrEdit();
        this.openProductModal(MProductComponent, {data: {suppliers: [this.form.get('supplierId')?.value]}});
    }

    openProductModal(component: any, params: any) {
        this.storeFinancialTransactions.openModalAddOrEdit();
        this.dialogService.open(component, params).onClose.subscribe((data: any) => {
            let tempProduct;
            if (component === MNewProductComponent && data) {
                tempProduct = this.createProduct(data.data);
            }
            if (data) {
                this.updateOrAddProduct(this.form.get('id')?.value, tempProduct);
            }

        });
    }

    updateOrAddProduct(id: string, tempProduct: any) {
        if (this.editing) {
            this.storeFinancialTransactions.addFinancialTransactionProduct(id, [tempProduct]).subscribe((response: any[]) => {
                this.storeService.setListProductSelected(response);
                this.storeService.loadAll({pageNumber: 0, pageSize: 50, type: this.form.get('type')?.value});
            });
        } else {
            this.addNewProduct(tempProduct);
        }
    }

    createProduct(tempProduct: any): any {
        return {
            productName: tempProduct.productName,
            soldPerUnits: tempProduct.soldPerUnits ? tempProduct.soldPerUnits : true,
            value: tempProduct.value,
            amount: tempProduct.amount
        }
    }

    addNewProduct(newProduct: any): void {
        this.products = [...this.products, newProduct];
    }

    deleteProduct(product: string) {
        const index = this.products.findIndex(p => p.id === product);
        if (this.editing && index !== -1) {
            this.storeFinancialTransactions.removeFinancialTransactionProduct(product).subscribe(() => {
                const updatedProducts = [...this.products];
                updatedProducts.splice(index, 1);
                this.products = updatedProducts;
                this.storeService.loadAll({pageNumber: 0, pageSize: 50, type: this.form.get('type')?.value});
            })
        } else {
            if (index !== -1) {
                const updatedProducts = [...this.products];
                updatedProducts.splice(index, 1);
                this.products = updatedProducts;
            }
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
        if (this.form.get('type')?.value === 'EXPENSES') {
            if (this.supplierService.autocomplete$()) {
                this.suggestionsSuppliers = this.supplierService.autocomplete$()?.map((item: any) => item) ?? [];
            }
        } else {
            if (this.commercesService.autocomplete$()) {
                this.suggestionsSuppliers = this.commercesService.autocomplete$()?.map((item: any) => item) ?? [];
            }
        }

    }

    searchClassifiers(event: { target: { value: string; } } | any) {
        debugger
        this.searchTextSuppliers = event.target.value;
        if (this.form.get('type')?.value === 'EXPENSES') {
            this.financeService.autocompleteSearch({
                filter: this.searchTextSuppliers,
            });
        } else {
            this.commercesService.autocomplete({
                filter: this.searchTextSuppliers,
            });
        }

    }

    searchFornecedor(event: { target: { value: string; } } | any) {
        this.searchTextClassifiers = event.target.value;
        this.supplierService.autocomplete({
            filter: this.searchTextClassifiers
        });
    }

    searchProduct(event: { target: { value: string; } } | any) {
        this.searchTextProducts = event.target.value;
        this.productService.autocomplete({
            filter: this.searchTextProducts,
            supplierId: this.form.get('supplierId')?.value?.id || ''
        });
    }

    reduceTotalPayments() {
        this.totalProducts = this.products.reduce((acc, curr) => acc + (curr.value * Number(curr.amount)), 0)
    }

    override save() {
        let send: any = {
            classifierId: this.form.get('classifierId')?.value.id,
            products: this.products.map((item: any) => ({
                amount: Number(item.amount),
                productId: item.id,
                productName: item.productName,
                unitMeasurementId: item.unitMeasurementCode,
                value: item.value,
                weight: item.weight,
            })),
            type: this.form.get('type')?.value,
        };

        if (this.editing) {
            if (this.form.get('type')?.value !== 'EXPENSES') {
                send.commerceId = this.form.get('commerceId')?.value?.id;
            }
            this.reduceTotalPayments();
            this.storeFinancialTransactions.updateFinancialTransaction(send, this.form.get('id')?.value);
            this.stepActive++;
        } else {
            if (this.form.get('type')?.value === 'EXPENSES') {
                send.supplierId = this.form.get('supplierId')?.value?.id;
            } else {
                send.commerceId = this.form.get('supplierId')?.value?.id;
            }
            this.storeFinancialTransactions.create({data: send});
        }
    }


    savePayment() {
        if (this.child.paymentInstallments.length === 0) {
            this.toastMessageService.showMessage("error", 'ERROR', 'Deve cadastrar pelo menos 1 parcela')
        } else {
            let send = {
                state: 'APPROVED'
            }
            this.storeFinancialTransactions.changeStateFinancialTransaction(send, this.form.get('id')?.value);
        }
    }

    confirmInstallment(event: any) {
        this.storeService.createInstallmentsByFinancialTransactions(event);
    }

    decreaseStepActive() {
        this.stepActive--;
    }
}
