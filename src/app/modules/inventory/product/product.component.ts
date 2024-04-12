import {Component} from '@angular/core';
import {ProductService} from "./services/product.service";
import {HeadersTable} from "../../../standalone/data-table/models";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {MProductComponent} from "./components/m-product/m-product.component";
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {productType} from "../../../core/enums/product";

@Component({
    selector: 'c-product',
    templateUrl: './product.component.html'
})
export class ProductComponent extends BaseComponentDirective {

    override modalContent = MProductComponent;
    override headersTable: HeadersTable[] = [
        {
            header: 'Nome', field: 'name', sort: true, class: 'text-center', visible: true
        },
        {
            header: 'Code', field: 'code',
            sort: true, class: 'text-center', visible: true
        },
        {
            header: 'Classificação', field: 'type', filter:true,
            sort: false, class: 'text-center', visible: true, width: 140
        },
        {
            header: 'Preço', field: 'costPrice', pipe: 'currency',
            sort: true, class: 'text-center', visible: true, width: 150
        },
        {
            header: 'Estoque', sort: true, field: 'stockAmount',
            class: 'text-center', visible: true
        },
        {
            header: 'Valor do estoque', sort: true, field: 'stockMoney',
            class: 'text-center', visible: true
        },
        {header: 'Ações', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    itemsSplit: MenuItem[] = [
        {
            label: this.translateService.instant('Adicional'),
            icon: 'mdi mdi-tag-plus mdi-24px', command: () => this.openAditional()
        },
        {
            label: this.translateService.instant('Combo'),
            icon: 'mdi mdi-food-outline mdi-24px', command: () => this.openCombo()
        }
    ];


    constructor(public productService: ProductService,
                private translateService: TranslateService) {
        super();
    }

    openAditional() {
        this.productService.openModalAddOrEdit();
        this.dialogService.open(this.modalContent, {data: {type: productType.ADDITIONAL}});
    }

    openCombo() {
        this.productService.getAdditionalProducts({pageNumber: 0, pageSize: 1000, type: productType.ADDITIONAL})
        this.productService.openModalAddOrEdit();
        this.dialogService.open(this.modalContent, {data: {type: productType.COMBO}});
    }

    customEdit(evt: any): void {
        this.productService.getById(evt.id)
        if(evt.type === 'COMBO'){
            this.productService.getAdditionalProducts({pageNumber: 0, pageSize: 1000, type: productType.ADDITIONAL})
        }
    }
}
