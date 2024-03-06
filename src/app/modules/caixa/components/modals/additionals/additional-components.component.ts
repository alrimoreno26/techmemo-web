import {Component, HostListener, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
        page: 0,
        count: 20,
        type: 'ADDITIONAL'
    }
    comboParams = {
        page: 0,
        count: 20,
        type: 'COMBO'
    }
    private fromAuthActions: any;

    constructor(private http: HttpClient,
                public service: CaixaService,
                private actions$: ActionsSubject,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {
    }

    ngOnInit(): void {
        this.product = this.config.data.product;
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

        this.subscriptions.push(
            this.actions$
                .pipe(ofType(fromOrdersListActions.addProductsOrdersSuccess))
                .subscribe(() => {
                    this.ref.close()
                })
        );
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
            console.log(this.product)
        }
    }

    addManyAdditionalProduct() {
        const params = [{
            amount: this.config.data.amount,
            id: this.product.id,
            additionals: this.additionalSelected.map((el: any) => {
                return {id: el.id, amount: 1}
            })
        }]
        this.service.addProductsOrders(this.service.selectedEntity$()[this.config.data.activeOrder].id, params)
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
