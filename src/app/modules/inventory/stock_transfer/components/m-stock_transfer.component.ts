import {Component, HostListener, OnInit} from "@angular/core";
import {productType} from "../../../../core/enums/product";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {Stock_TransferStore} from "../store/stock_transfer.store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../product/services/product.service";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {SessionServices} from "../../../../core/injects/session.services";
import {BehaviorSubject, Subscription} from "rxjs";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";

@Component({
    templateUrl: './m-stock_transfer.component.html',
})
export class MStock_TransferComponent extends BaseModalStoreComponentDirective implements OnInit {
    lojas: any[] = [];
    lojasDestination: any[] = [];
    searchText: string;
    suggestions: any[] = [];
    selectedItem: any;
    selectedItemAmount: number = 1;

    private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    products$ = this.productsSubject.asObservable();
    totalProducts = 0;

    private subscription: Subscription = new Subscription();

    constructor(public stockTransferStore: Stock_TransferStore,
                private dialogRegistryService: DialogRegistryService,
                public session: SessionServices) {
        super(stockTransferStore);
        this.dialogRegistryService.addDialog(this.ref);
    }

    ngOnInit(): void {
        this.lojas = this.session.userLogged.commerces.filter((x: any) => x.owner && x.commerceId !== this.session.getCurrentStore().id);
        console.log(this.lojas)

        this.form = new FormGroup({
            sourceCommerceId: new FormControl<string>('', Validators.required),
            destinationCommerceId: new FormControl<string>('', Validators.required),
            description: new FormControl<string>('', Validators.required),
        })

        this.initSubcription();
    }

    set products(products: any[]) {
        this.productsSubject.next(products);
    }

    get products(): any[] {
        return this.productsSubject.getValue();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'Enter':
                if (this.suggestions.length > 0) {
                    if (this.selectedItem !== undefined) {
                        const tempProduct = {
                            productName: this.selectedItem.name,
                            id: this.selectedItem.id,
                            soldPerUnits: this.selectedItem.soldPerUnits,
                            value: this.selectedItem.avgCostPrice,
                            amount: this.selectedItemAmount
                        };
                        // Verificar si el producto ya existe en el array
                        const existingProductIndex = this.products.findIndex(product => product.id === tempProduct.id);

                        if (existingProductIndex !== -1) {
                            // Si el producto ya existe, aumentar la cantidad
                            this.products[existingProductIndex].amount += tempProduct.amount;
                        } else {
                            // Si el producto no existe, agregarlo al array
                            this.products = [...this.products, tempProduct];
                        }

                        this.selectedItem = undefined;

                        this.form.get('products')?.setValue(this.products);

                    }
                }
                break;
        }
    }

    onProductChange() {
        setTimeout(() => {
            this.reduceTotalPayments();
        }, 100);
    }

    reduceTotalPayments() {
        this.totalProducts = this.products.reduce((acc, curr) => acc + (curr.value * Number(curr.amount)), 0)
    }

    private initSubcription(): void {
        this.subscription.add(
            this.form.valueChanges.subscribe((origen) => {
                this.lojasDestination = this.session.userLogged.commerces.filter((x: any) =>
                    x.owner &&
                    x.commerceId !== this.session.getCurrentStore().id &&
                    x.commerceId !== origen.sourceCommerceId
                );
            })
        )
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

    override save() {
        let send: any = {
            ...this.form.value,
            products: this.products.map((item: any) => ({
                amount: Number(item.amount),
                productId: item.id,
            })),
        };
        this.stockTransferStore.create({data: send})

    }
}
