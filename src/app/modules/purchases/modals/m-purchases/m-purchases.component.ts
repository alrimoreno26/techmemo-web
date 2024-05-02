import {Component, OnInit} from "@angular/core";
import {StorePurchasesServices} from "../../services/store.purchases.services";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {Stock_TransferStore} from "../../../inventory/stock_transfer/store/stock_transfer.store";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {MFornecedoresComponent} from "../../../inventory/forncedores/components/m-fornecedores/m-fornecedores.component";
import {DialogService} from "primeng/dynamicdialog";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";

@Component({
    templateUrl: './m-purchases.component.html',
    styles:[`
        ::ng-deep .p-dialog .p-dialog-content {
            overflow: hidden;
        }
    `]
})
export class MPurchasesComponent extends BaseModalStoreComponentDirective implements OnInit {

    searchText: string;
    suggestions: any[] = [];
    selectedItem: any;
    selectedPayment: any;

    constructor(private storeService: StorePurchasesServices,
                public supplierService: SupplierService,
                private dialogService: DialogService,
                public paymentMethodService: PaymentMethodService,
                public stockTransferStore: Stock_TransferStore) {
        super(storeService);
        if (!paymentMethodService.loaded$()) {
            this.paymentMethodService.loadAll({lazy: {pageNumber: 0, pageSize: 10}})
        }
    }

    ngOnInit(): void {
        const {data} = this.config;
    }

    searchProducts(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.stockTransferStore.autocomplete({filter: this.searchText, type: 'SIMPLE'});
    }

    search(event: AutoCompleteCompleteEvent) {
        this.stockTransferStore.autocomplete$.subscribe((res) => {
            if (res) {
                this.suggestions = res.map((item: any) => item) ?? [];
            }
        })
    }

    supplier(id: string) {
        // @ts-ignore
        return this.supplierService.listEntities$().find(s => s.id === id);
    }

    addFornecedor() {
        this.supplierService.openModalAddOrEdit();
        this.dialogService.open(MFornecedoresComponent, {});
    }
}
