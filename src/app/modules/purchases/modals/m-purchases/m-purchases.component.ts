import {Component, HostListener, OnInit} from "@angular/core";
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
import {supplierType} from "../../../../core/models/supplier";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FinancialTransactionsServices} from "../../services/financial-transactions.services";
import {ProductService} from "../../../inventory/product/services/product.service";
import {AdditionalComponents} from "../../../caixa/components/modals/additionals/additional-components.component";
import {HttpHeaders} from "@angular/common/http";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";
import {MNewProductComponent} from "../m-new-product/m-new-product.component";
import {MProductComponent} from "../../../inventory/product/components/m-product/m-product.component";
import {cloneDeep} from "lodash";

@Component({
    templateUrl: './m-purchases.component.html',
    styles: [`
        ::ng-deep .p-dialog .p-dialog-content {
            overflow: hidden;
        }

        ::ng-deep .p-dialog .p-divider-content {
            width: 300px;
        }
    `]
})
export class MPurchasesComponent extends BaseModalStoreComponentDirective implements OnInit {

    selectedPayment: any;

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

    productList: any[] = [];
    totalProducts = 0;


    transactionTypes: any[] = [
        {label: 'Contas a pagar', value: 'EXPENSES'},
        {label: 'Renda a recebir', value: 'BILLING'}
    ];

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
        if (!paymentMethodService.loaded$()) {
            this.paymentMethodService.loadAll({lazy: {pageNumber: 0, pageSize: 10}})
        }
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.financeService.autocompleteSearch({
            filter: this.searchTextSuppliers,
        });
        this.supplierService.autocomplete({
            filter: this.searchTextClassifiers,
        });
        this.form = new FormGroup({
            id: new FormControl(data?.id),
            supplierId: new FormControl(data?.supplier, Validators.required),
            classifierId: new FormControl(data?.transactionType, Validators.required),
            products: new FormControl(data?.products, Validators.required),
            type: new FormControl('EXPENSES', Validators.required),
        });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'Enter':
                if (this.selectedItem !== undefined) {
                    this.productList.push({
                        ...this.selectedItem,
                        amount: this.selectedItemAmount,
                        valueToPaid: this.selectedItem.salePrice * this.selectedItemAmount
                    });
                    this.selectedItem = undefined;
                    this.selectedItemAmount = 1;
                    this.form.get('products')?.setValue(this.productList);
                    this.reduceTotalPayments();
                }
                break;
        }
    }

    novoProducto() {
        this.storeFinancialTransactions.openModalAddOrEdit();
        this.dialogService.open(MNewProductComponent, {}).onClose.subscribe((data: any) => {
            this.productList.push({
                name: data.data.productName,
                soldPerUnits: true,
                costPrice: data.data.value,
                amount: data.data.amount
            });
        });
        this.reduceTotalPayments();
    }

    addProduct() {
        this.productService.openModalAddOrEdit()
        this.dialogService.open(MProductComponent, {data: {suppliers: [this.form.get('supplierId')?.value]}}).onClose.subscribe((data: any) => {
            const temp = cloneDeep(this.productService.temporalCreated$())
            this.productList.push({
                name: temp.name,
                soldPerUnits: temp.soldPerUnits,
                costPrice: temp.costPrice,
                amount: temp.stockAmount
            });
        });
        this.reduceTotalPayments();
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
        this.totalProducts = this.productList.reduce((acc, curr) => acc + curr.valueToPaid, 0)
    }

    override save() {
        const send = {
            classifierId: this.form.get('classifierId')?.value.id,
            products: this.productList.map((item: any) => {
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
}
