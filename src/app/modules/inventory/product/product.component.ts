import {Component} from '@angular/core';
import {ProductService} from "./services/product.service";
import {HeadersTable} from "../../../standalone/data-table/models";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {MProductComponent} from "./components/m-product/m-product.component";
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {productType} from "../../../core/enums/product";
import * as XLSX from "xlsx";
import {CategoryDto} from "../../../core/models";
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "../../../core/models/products";

@Component({
    selector: 'c-product',
    templateUrl: './product.component.html'
})
export class ProductComponent extends BaseComponentDirective {

    override modalContent = MProductComponent;
    override headersTable: HeadersTable[] = [
        {
            header: '', field: 'logo', sort: true, class: 'text-center', visible: true
        }, {
            header: 'Nome', field: 'name', sort: true, class: 'text-center', visible: true
        },
        {
            header: 'Code', field: 'code',
            sort: true, class: 'text-center', visible: true
        },
        {
            header: 'Classificação',
            field: 'type',
            filter: true,
            filterValue: [productType.ADDITIONAL, productType.COMBO, productType.SIMPLE],
            sort: false,
            class: 'text-center',
            visible: true,
            width: 140
        },
        {
            header: 'Custo Medio', field: 'costPrice', pipe: 'currency',
            sort: true, class: 'text-center', visible: true, width: 150
        },
        {
            header: 'Estoque', sort: true, field: 'stockAmount',
            class: 'text-center', visible: true
        },
        {
            header: 'Valor do estoque', sort: true, field: 'totalStockValue',
            class: 'text-center', visible: true, pipe: 'currency'
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
                private translateService: TranslateService,
                private http: HttpClient) {
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
        if (evt.type === 'COMBO') {
            this.productService.getAdditionalProducts({pageNumber: 0, pageSize: 1000, type: productType.ADDITIONAL})
        }
    }

    importProducts() {
        const workbook = 'assets/products.xlsx';
        // Obtiene la primera hoja del archivo (puedes ajustar esto según tu caso)
        return this.http.get(workbook, {responseType: 'arraybuffer'})
            .subscribe(
                (data) => {
                    const send = this.processExcelData(data);
                    console.log(send)
                    let index = 0;
                    // const intervalId = setInterval(() => {
                    //     if (index < send.length) {
                    //         this.productService.create(send[index]);
                    //         console.log("¡La función se ejecutó después de 5000 milisegundos (5 segundos)!");
                    //         index++;
                    //     } else {
                    //         clearInterval(intervalId);
                    //         console.log("Todos los datos han sido insertados.");
                    //     }
                    // }, 200); // 5000 milisegundos = 5 segundos
                },
                (error) => {
                    console.error('Error loading Excel file:', error);
                }
            );
    }

    private processExcelData(data: ArrayBuffer) {
        const workbook = XLSX.read(new Uint8Array(data), {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        let products: ProductDto[] = [];

        jsonData.forEach((row: any) => {
            if (row[0] !== undefined) {
                const p: any = {
                    name: row[0],
                    categoryId: row[1],
                    costPrice: row[2],
                    salePrice: row[3],
                    cfop: row[5] === undefined ? 1 : row[5],
                    ncm: row[6] === undefined ? 1 : row[6],
                    cst: row[6] === undefined ? 1 : row[7],
                    type: 'ADDITIONAL',
                }
                products.push(p)
            }

        });

        return products;
    }
}
