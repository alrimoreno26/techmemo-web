import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {UserModalComponent} from './components/user-modal/user-modal.component';
import {MenuItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {GeneratePasswordModalComponent} from './components/generate-password-modal/generate-password-modal.component';
import {BaseComponentDirective} from '../../../standalone/data-table/directives/base.component.directive';
import {HeadersTable} from '../../../standalone/data-table/models';
import {ConfirmServices} from '../../../core/injects/confirm.services';
import {takeUntil} from 'rxjs';
import {confirmDialog} from '../../../core/rx/confirm';

@Component({
  selector: 'p-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponentDirective {

  override modalContent = UserModalComponent;
  override headersTable: HeadersTable[] = [
    {header: 'security.user.labels.name', field: 'name', sort: true, visible: true},
    {header: 'security.user.labels.cpf', field: 'cpf', sort: true, pipe: 'cpfCnpj', visible: true},
    {header: 'security.user.labels.role', field: 'role', sort: true, pipe: 'deep', extraVal: 'name', visible: true},
    {header: 'security.user.labels.email', field: 'email', sort: true, pipe: 'email', visible: true},
    {header: 'security.user.labels.phone', field: 'phone', sort: true, pipe: 'tel', width: 140, visible: true},
    {header: 'security.user.labels.created', field: 'created', sort: true, pipe: 'date', width: 110, visible: true},
    {header: 'common.action', field: 'action', class: 'text-center', visible: true, export: false}
  ];

  constructor(public service: UserService,
              private confirmationService: ConfirmServices,
              private translateService: TranslateService) {
    super();
  }

  /**
   * Reset Rating if you confirm dialog
   */
  resetRating(): void {
    this.confirmationService.confirm(
      'security.user.messages.confirmation',
      'security.user.messages.message'
    ).pipe(
      takeUntil(this.ngUnsubscribe),
      confirmDialog(() => this.service.resetRating())
    ).subscribe();
  }

  /**
   * Generate Password
   * @param data {@link User}
   */
  generatePassword(data: any): void {
    this.dialogService.open(GeneratePasswordModalComponent, {data});
  }

  resetUserCompany(data: any): void {
    this.confirmationService.confirm(
      'security.user.messages.confirmation',
      'security.user.messages.message'
    ).pipe(
      takeUntil(this.ngUnsubscribe),
      confirmDialog(() => this.service.resetUserCompany(data.id))
    ).subscribe();
  }
}
