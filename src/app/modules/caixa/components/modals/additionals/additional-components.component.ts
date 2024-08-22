import {Component, effect, HostListener, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LazyResultData} from "../../../../../standalone/data-table/models";
import {buildURL} from "../../../../../core/util";
import {forkJoin, Subscription} from "rxjs";
import {ProductDto} from "../../../../../core/models/products";
import {cloneDeep, isObject} from "lodash";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CaixaService} from "../../../services/caixa.service";
import {ActionsSubject} from "@ngrx/store";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";
import {flavorsEmun} from "../../../../../core/enums/commerce";

@Component({
    selector: 'm-additional',
    templateUrl: './additional-components.component.html'
})
export class AdditionalComponents implements OnInit, OnChanges {

    product: ProductDto;

    subscriptions: Subscription[] = [];

    additionals: LazyResultData<any> = {content: [], page: {totalElements: 0, totalPages: 0, number: 0, size: 0}};
    combos: LazyResultData<any> = {content: [], page: {totalElements: 0, totalPages: 0, number: 0, size: 0}};
    additionalsParams = {
        pageNumber: 0,
        pageSize: 20,
        type: 'ADDITIONAL'
    }
    comboParams = {
        pageNumber: 0,
        pageSize: 20,
        type: 'COMBO'
    }
    activeIndex = 0;
    amountItems: any[] = [];
    listProducts: any[] = [];
    listFlavors: any[] = [];
    allowFlavors = false;

    constructor(private http: HttpClient,
                public service: CaixaService,
                private actions$: ActionsSubject,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                private dialogRegistryService: DialogRegistryService) {
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            console.log(service.dialogAdditional$())
            if (!service.dialogAdditional$()) {
                this.ref.close();
            }
        });
    }

    ngOnInit(): void {

        this.product = this.config.data.product;
        console.log(this.product)
        this.amountItems = Array.from({length: this.config.data.amount}, (_, index) => {
            this.listProducts.push({
                amount: 1,
                id: this.product.id,
                additionals: []
            });
            return {label: this.product.name};
        });
        console.log(this.listProducts);

        this.listProducts[this.activeIndex].additionals = this.config.data?.additionalSelected ? cloneDeep(this.config.data?.additionalSelected) : [];
        const params1: HttpParams = new HttpParams({fromObject: this.additionalsParams});
        const params2: HttpParams = new HttpParams({fromObject: this.comboParams});
        forkJoin({
            result1: this.http.get<LazyResultData<any>>(`${buildURL('/v1/products')}?${params1}`),
            result2: this.http.get<LazyResultData<any>>(`${buildURL('/v1/products')}?${params2}`),
        }).subscribe(({result1, result2}) => {
            this.additionals = result1;
            this.combos = result2;
        })
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'Enter':
                this.addManyAdditionalProduct()
                break;

        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["product"] && !changes["product"].firstChange && isObject(changes["product"].currentValue)) {

        }
    }

    getAdditionalForProduct() {
        return this.config.data.amount > 1 ? this.listProducts[this.activeIndex].additionals : this.listProducts[0].additionals;
    }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    stepper(direction: string) {
        if (direction === '+') {
            this.activeIndex++;
        } else {
            this.activeIndex--;
        }
    }

    addManyAdditionalProduct() {
        const newArray = this.listProducts.map(item => {
            let flavors: string[] = [];

            // Filtramos los additionals que no tienen flavors como true
            const newAdditionals = item.additionals
                .filter((additional: any) => {
                    if (additional.flavors) {
                        // Guardamos el productId en el arreglo flavors si flavors es true
                        flavors.push(additional.productId);
                        return false; // No incluir en newAdditionals
                    }
                    return true; // Incluir en newAdditionals
                })
                .map((additional: any) => {
                    return { ...additional, id: additional.productId, productId: undefined };
                });

            return { ...item, description: flavors.join(','), additionals: newAdditionals };
        });

        if (this.config.data.created) {
            this.service.addProductsOrders(this.service.selectedEntity$()[this.config.data.activeOrder].id, newArray);
        } else {
            this.service.updateProductsOrders(this.product.id, this.service.selectedEntity$()[this.config.data.activeOrder].id, newArray);
        }
    }

    addElement(event: any, item: any, flavors = false) {
        event.stopPropagation();
        this.listProducts[this.activeIndex].additionals.push({...item, productId: item.id, amount: 1});
    }

    addElementClick(event: any, item: any, flavors = false) {
        event.stopPropagation();
        if (flavors) {
            if (this.listProducts[this.activeIndex].additionals.find((x: any) => x.productId === item.name) === undefined) {
                // Si no existe, lo añadimos a la lista de additionals
                this.listProducts[this.activeIndex].additionals.push({
                    ...item,
                    productId: item.name,
                    amount: 1,
                    flavors: true
                });
                console.log(this.listProducts);
            }
        } else {
            this.listProducts[this.activeIndex].additionals.push({...item, productId: item.id, amount: 1});
        }
    }

    removeElement(event: any, item: any, flavors = false) {
        event.stopPropagation();
        this.listProducts[this.activeIndex].additionals.splice(item, 1);
    }

    removeElementbyId(event: any, item: any, flavors = false) {
        event.stopPropagation();
        this.listProducts[this.activeIndex].additionals = this.listProducts[this.activeIndex].additionals.filter((ad: any) => ad.productId !== item.id)
    }

    totalAdditionals(): number {
        return (this.product?.salePrice || 0) + this.listProducts[this.activeIndex].additionals.reduce((total: any, item: any) => total + item.salePrice, 0);
    }

    protected readonly flavorsEmun = flavorsEmun;
}
