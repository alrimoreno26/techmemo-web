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
import {ofType} from "@ngrx/effects";
import {fromOrdersListActions} from "../../../store/caixa.actions";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-additional',
    templateUrl: './additional-components.component.html'
})
export class AdditionalComponents implements OnInit, OnChanges {

    product: ProductDto;
    additionalSelected: any[] = [];

    subscriptions: Subscription[] = [];

    additionals: LazyResultData<any> = {content: [], totalPages: 0, totalElements: 0};
    combos: LazyResultData<any> = {content: [], totalPages: 0, totalElements: 0};
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

    constructor(private http: HttpClient,
                public service: CaixaService,
                private actions$: ActionsSubject,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                private dialogRegistryService: DialogRegistryService) {
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            if(service.orderCreate$()){
                this.ref.close();
            }
        });
    }

    ngOnInit(): void {
        console.log(this.config)
        this.product = this.config.data.product;
        this.amountItems = Array.from({length: this.config.data.amount}, (_, index) => {
            return {label: this.product.name};
        });
        this.additionalSelected = this.config.data?.additionalSelected ? cloneDeep(this.config.data?.additionalSelected) : [];
        const params1: HttpParams = new HttpParams({fromObject: this.additionalsParams});
        const params2: HttpParams = new HttpParams({fromObject: this.comboParams});
        forkJoin({
            result1: this.http.get<LazyResultData<any>>(`${buildURL('/v1/products')}?${params1}`),
            result2: this.http.get<LazyResultData<any>>(`${buildURL('/v1/products')}?${params2}`),
        }).subscribe(({result1, result2}) => {
            this.additionals = result1;
            this.combos = result2;
        })

        // this.subscriptions.push(
        //     this.actions$
        //         .pipe(ofType(fromOrdersListActions.addProductsOrdersSuccess))
        //         .subscribe((x) => {
        //             console.log(x)
        //             this.ref.close()
        //         })
        // );
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

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    stepper(direction: string) {
        const updateListProducts = () => {
            this.listProducts[this.activeIndex] = {
                amount: 1,
                id: this.product.id,
                additionals: this.additionalSelected.map((el: any) => ({id: el.id ? el.id : el.productId, amount: 1}))
            };
        };

        if (direction === '+') {
            if (this.listProducts[this.activeIndex + 1]?.additionals.length > 0) {
                this.additionalSelected = this.obtenerInterseccion(this.additionals.content, this.listProducts[this.activeIndex + 1].additionals, 'id');
            } else {
                updateListProducts();
                this.additionalSelected = [];
            }
            this.activeIndex++;
        } else {
            updateListProducts();
            this.activeIndex--;
            if (this.activeIndex === 0) {
                this.additionalSelected = this.config.data?.additionalSelected ? cloneDeep(this.config.data?.additionalSelected) : this.listProducts[0].additionals;
            } else {
                this.additionalSelected = this.obtenerInterseccion(this.additionals.content, this.listProducts[this.activeIndex].additionals, 'id');
            }
        }
    }

    obtenerInterseccion(array1: any[], array2: any[], id: string) {
        const idCount = array2.reduce((acc, item) => {
            acc[item[id]] = (acc[item[id]] || 0) + 1;
            return acc;
        }, {});

        const result = [];
        for (const item of array1) {
            if (idCount[item[id]] && idCount[item[id]] > 0) {
                result.push(item);
                idCount[item[id]]--;
            }
        }
        return result;
    }

    addManyAdditionalProduct() {
        const params = [{
            amount: this.config.data.amount,
            id: this.product.id,
            additionals: this.additionalSelected.map((el: any) => ({id: el.id, amount: 1}))
        }];

        if (this.config.data.amount > 1) {
            this.service.addProductsOrders(this.service.selectedEntity$()[this.config.data.activeOrder].id, this.listProducts);
        } else {
            this.service.addProductsOrders(this.service.selectedEntity$()[this.config.data.activeOrder].id, params);
        }
    }

    addElement(event: any, item: any) {
        event.stopPropagation();
        this.additionalSelected.push(item);
    }

    addElementClick(event: any, item: any) {
        event.stopPropagation();
        this.additionalSelected.push(item);
    }

    removeElement(event: any, item: any) {
        event.stopPropagation();
        this.additionalSelected.splice(item, 1);
    }

    removeElementbyId(event: any, item: any) {
        event.stopPropagation();
        this.additionalSelected = this.additionalSelected.filter((ad: any) => ad.id !== item.id)
    }

    totalAdditionals(): number {
        return (this.product?.salePrice || 0) + this.additionalSelected.reduce((total, item) => total + item.salePrice, 0);
    }
}
