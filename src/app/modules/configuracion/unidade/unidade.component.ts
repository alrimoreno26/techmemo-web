import {Component, ElementRef, ViewChild} from "@angular/core";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {HeadersTable} from "../../../standalone/data-table/models";
import {UnidadeService} from "./services/unidade.service";
import {MUnidadeComponent} from "./components/m-unidade/m-unidade.component";

@Component({
    selector:'c-category',
    templateUrl: './unidade.component.html'
})
export class UnidadeComponent extends BaseComponentDirective {

    override modalContent = MUnidadeComponent;
    override headersTable: HeadersTable[] = [
        {
            header: 'Name', field: 'name',
            class: 'text-center', visible: true, export: false
        },
        {
            header: 'Code', field: 'code',
            class: 'text-center', visible: true, export: true
        },
        {header: 'Actions', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(public service: UnidadeService) {
        super();
    }
}
