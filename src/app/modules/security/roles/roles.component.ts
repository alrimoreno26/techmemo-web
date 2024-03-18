import {Component} from '@angular/core';
import {RoleService} from './services/role.service';
import {RoleModalComponent} from './components/role-modal/role-modal.component';
import {HeadersTable} from '../../../standalone/data-table/models';
import {BaseComponentDirective} from '../../../standalone/data-table/directives/base.component.directive';

@Component({
    selector: 'p-roles',
    templateUrl: './roles.component.html'
})
export class RolesComponent extends BaseComponentDirective {

    override modalContent = RoleModalComponent;
    override headersTable: HeadersTable[] = [
        {header: 'security.role.labels.name', field: 'name', sort: true, visible: true, export: true},
        {header: 'security.role.labels.description', field: 'description', sort: true, visible: true, export: true},
        {
            header: 'security.role.labels.operationArea',
            field: 'operationArea',
            sort: true,
            visible: true,
            export: true
        },
        {header: 'common.action', field: 'action', class: 'text-center', visible: true, export: false}
    ];

    constructor(public service: RoleService) {
        super();
    }
}
