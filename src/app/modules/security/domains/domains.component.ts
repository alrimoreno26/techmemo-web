import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseComponentDirective} from '../../../standalone/data-table/directives/base.component.directive';
import {HeadersTable} from '../../../standalone/data-table/models';
import {ConfirmServices} from '../../../core/injects/confirm.services';
import {DomainsService} from "./services/domains.service";
import {DomainsModalComponent} from "./components/domains-modal/domains-modal.component";

@Component({
  selector: 'p-user',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent extends BaseComponentDirective {

  override modalContent = DomainsModalComponent;
  override headersTable: HeadersTable[] = [
    {header: 'security.user.labels.name', field: 'name', sort: true, visible: true, export: true},
    {header: 'security.user.labels.cpf', field: 'cpf', sort: true, pipe: 'cpfCnpj', visible: true, export: true},
    {header: 'security.user.labels.role', field: 'role', sort: true, pipe: 'deep', extraVal: 'name', visible: true, export: true},
    {header: 'security.user.labels.email', field: 'email', sort: true, pipe: 'email', visible: true, export: true},
    {header: 'security.user.labels.phone', field: 'phone', sort: true, pipe: 'tel', width: 140, visible: true, export: true},
    {header: 'security.user.labels.created', field: 'created', sort: true, pipe: 'date', width: 110, visible: true, export: true},
    {header: 'common.action', field: 'action', class: 'text-center', visible: true, export: false}
  ];

  constructor(public service: DomainsService,
              private confirmationService: ConfirmServices,
              private translateService: TranslateService) {
    super();
  }

}
