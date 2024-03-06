import {Component, ElementRef, ViewChild} from "@angular/core";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {HeadersTable} from "../../../standalone/data-table/models";
import {SupplierService} from "./services/supplier.service";
import {MFornecedoresComponent} from "./components/m-fornecedores/m-fornecedores.component";

@Component({
    selector: 'c-fornecedores',
    templateUrl: './fornecedores.component.html'
})
export class FornecedoresComponent extends BaseComponentDirective {

    override modalContent = MFornecedoresComponent;
    override headersTable: HeadersTable[] = [
        {header: 'Document', field: 'document', pipe: 'cpfCnpj', class: 'text-center', visible: true, export: true},
        {header: 'Nome', field: 'identification', class: 'text-center', visible: true, export: true},
        {header: 'E-mail', field: 'email', class: 'text-center', visible: true, export: true},
        {header: 'Phone', field: 'phone', pipe: 'tel', class: 'text-center', visible: true, export: true},
        {header: 'Actions', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(public categoryService: SupplierService) {
        super();
    }

    edit(evt:any):void{
        this.categoryService.getById(evt.id)
    }
}
