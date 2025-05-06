import {Component, effect} from "@angular/core";
import * as XLSX from 'xlsx';
import {HttpClient} from "@angular/common/http";
import {MClientesComponent} from "./components/m-category/m-clientes.component";
import {HeadersTable} from "../../standalone/data-table/models";
import {StoreClientsService} from "./services/store-clients.service";
import {BaseComponentDirective} from "../../standalone/data-table/directives/base.component.directive";

@Component({
    selector: 'c-clientes',
    templateUrl: './clientes.component.html'
})
export class ClientesComponent extends BaseComponentDirective {

    override modalContent = MClientesComponent;

    override headersTable: HeadersTable[] = [
        {header: 'Nome', field: 'name', sort: true, class: 'text-center', visible: true},
        {header: 'CPF', field: 'cpf', sort: true, class: 'text-center', visible: true, pipe:'cpfCnpj'},
        {header: 'Telefone', field: 'phone', sort: true, class: 'text-center', pipe:'tel', visible: true},
        {header: 'Ações', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(private http: HttpClient, public service: StoreClientsService) {
        super();
        effect(() => {
            if (this.service.dialog$()) {
                console.log('entre')
            }
        })
    }

    customCreate(event: any) {
        this.service.openModalAddOrEdit();
    }

}
