import {Component} from "@angular/core";
import {HeadersTable} from "../../../standalone/data-table/models";
import {StoreCategoryService} from "./services/store.category.service";
import {MCategoryComponent} from "./components/m-category/m-category.component";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import * as XLSX from 'xlsx';
import {HttpClient} from "@angular/common/http";
import {CategoryDto} from "../../../core/models";

@Component({
    selector: 'c-category',
    templateUrl: './category.component.html'
})
export class CategoryComponent extends BaseComponentDirective {

    override modalContent = MCategoryComponent;

    override headersTable: HeadersTable[] = [
        {header: 'Nome', field: 'name', sort: true, class: 'text-center', visible: true},
        {
            header: 'Descrição',
            field: 'description',
            pipe: 'sanitizeHtml',
            sort: true,
            class: 'text-center',
            visible: true,
            export: true
        },
        {header: 'Ações', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(public categoryService: StoreCategoryService, private http: HttpClient,) {
        super();
        this.categoryService.loadAll({
            lazy: {
                pageNumber: 0,
                pageSize: 10,
                type: 'PARENT'
            }
        })
        // this.importCategorys()
    }

    customEdit(event: any) {
        this.categoryService.findOneById(event.id)
    }

    importCategorys() {
        const workbook = 'assets/categorias.xlsx';
        // Obtiene la primera hoja del archivo (puedes ajustar esto según tu caso)
        return this.http.get(workbook, {responseType: 'arraybuffer'})
            .subscribe(
                (data) => {
                    const send = this.processExcelData(data);
                    send.forEach(x => {
                        if (x.name !== 'AGREGADOS')
                            setTimeout(() => {
                                this.categoryService.create({data: x})
                                console.log("¡La función se ejecutó después de 2000 milisegundos (5 segundos)!");
                            }, 5000);
                    })
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

        let categorys: CategoryDto[] = [];

        const groupedData: { [key: string]: string[] } = {};
        jsonData.forEach((row: any) => {
            const key = row[0]; // Usa la primera posición de row como clave

            if (!groupedData[key]) {
                groupedData[key] = [];
            }

            let uniqueElements = []
            uniqueElements = Array.from(new Set(row.slice(1)));
            // @ts-ignore
            groupedData[key] = groupedData[key].concat(uniqueElements);
        });
        Object.keys(groupedData).map((x: any) => {
            let subCategories: CategoryDto[] = [];
            if (groupedData[x].length > 0) {
                groupedData[x] = Array.from(new Set(groupedData[x]));
                Array.from(new Set(groupedData[x])).forEach((f, index) => {
                    subCategories.push({
                        description: f,
                        name: f
                    })
                })
                categorys.push({
                    description: x,
                    name: x,
                    subCategories: subCategories
                });
            }
        })
        return categorys;
    }

}
