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
import {removeNullProperties} from "../../../core/util";

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
            header: 'Custo Medio', field: 'avgCostPrice', pipe: 'currency',
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
        // this.productService.openModalAddOrEdit();
        // this.dialogService.open(this.modalContent, {data: {type: productType.ADDITIONAL}});
        // this.importProducts();
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
        const workbook = 'assets/base_factory.xlsx';
        // Obtiene la primera hoja del archivo (puedes ajustar esto según tu caso)
        return this.http.get(workbook, {responseType: 'arraybuffer'})
            .subscribe(
                (data) => {
                    const send = this.processExcelData(data);
                    let index = 0;
                    console.log(send)
                    const intervalId = setInterval(() => {
                        if (index < send.length) {
                            this.productService.create(send[index]);
                            console.log("¡La función se ejecutó después de 5000 milisegundos (5 segundos)!");
                            index++;
                        } else {
                            clearInterval(intervalId);
                            console.log("Todos los datos han sido insertados.");
                        }
                    }, 200); // 5000 milisegundos = 5 segundos
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
                    factoryProduct: true,
                    type: row[2],
                    categoryId: row[3],
                    costPrice: row[4],
                    avgCostPrice: row[4],
                    salePrice: row[5],
                    cfop: row[7] === undefined ? 1 : row[7],
                    ncm: row[8] === undefined ? 1 : row[8],
                    cst: row[9] === undefined ? 1 : row[9],
                    code: row[10] === undefined ? 1 : row[10],
                    allowsAdditional: row[11].toLowerCase() === 'Sim'.toLowerCase(),
                    soldPerUnits: row[12].toLowerCase() === 'Unitário'.toLowerCase(),
                    enabled: row[13].toLowerCase() === 'Sim'.toLowerCase(),
                    showInMenu: row[14].toLowerCase() === 'Sim'.toLowerCase(),
                    stockAmount: row[15],
                    quantityStockAlert: row[16],
                    quantityInPackaging: row[17]
                }
                if(row[12].toLowerCase() === 'KG'.toLowerCase()){
                    p.unitMeasurementId = '3da95e8e-0c43-4d4e-9f20-fe216976e454'
                }

                products.push(p)
            }

        });

        return products;
    }
}
