import {Component, OnInit} from "@angular/core";
import {productType} from "../../../../core/enums/product";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {Stock_TransferStore} from "../store/stock_transfer.store";
import {FormGroup} from "@angular/forms";
import {ProductService} from "../../product/services/product.service";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
    templateUrl: './m-stock_transfer.component.html',
})
export class MStock_TransferComponent extends BaseModalStoreComponentDirective implements OnInit {
    locals = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    selectedCity: any | undefined;
    searchText: string;
    suggestions: any[] = [];
    selectedItem: any;
    constructor(public stockTransferStore: Stock_TransferStore) {
        super(stockTransferStore);
    }
    ngOnInit(): void {
        const data = this.config.data

        this.form = new FormGroup({

        })
    }

    searchProducts(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.stockTransferStore.autocomplete({filter: this.searchText, type: 'SIMPLE'});
    }

    search(event: AutoCompleteCompleteEvent) {
        this.stockTransferStore.autocomplete$.subscribe((res) => {
            if(res){
                this.suggestions = res.map((item: any) => item) ?? [];
            }
        })
    }

    protected readonly productType = productType;
}
