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
    {header: 'security.user.labels.description', field: 'description', sort: true, visible: true},
    {header: 'security.user.labels.domainType', field: 'type', sort: true, visible: true},
    {header: 'security.user.labels.created', field: 'created', sort: true, pipe: 'date', width: 110, visible: true},
    {header: 'common.action', field: 'action', class: 'text-center', visible: true, export: false}
  ];

  constructor(public service: DomainsService,
              private confirmationService: ConfirmServices,
              private translateService: TranslateService) {
    super();
  }

}
