import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../services/role.service';
import {flatMap, groupBy, map} from 'lodash';
import {AuthMap, AuthorityTO, Options} from '../../../../../core/models';
import {BaseModalComponentDirective} from '../../../../../standalone/data-table/directives/base.modal.component.directive';
import {domainEnum, operationAreaRoleEnum, permissionAuthorityTOEnum} from "../../../../../core/enums/role";

@Component({
  selector: 'm-role-modal',
  templateUrl: './role-modal.component.html'
})
export class RoleModalComponent extends BaseModalComponentDirective implements OnInit {

  authorities: FormArray;
  operationArea: Options[] = [
    {value: 'BACKOFFICE', name: 'BACKOFFICE'},
    {value: 'CLIENT', name: 'CLIENT'},
    {value: 'ENTREPRENEUR', name: 'ENTREPRENEUR'},
    {value: 'PARTNER', name: 'PARTNER'},
    {value: 'SECURITY', name: 'SECURITY'},
    {value: 'CURATOR', name: 'CURATOR'}
  ];

  constructor(private roleService: RoleService) {
    super(roleService);
  }

  ngOnInit(): void {
    const {data} = this.config;

    this.authorities = new FormArray(map(groupBy(this.roleService.authorityList$(), 'type'), (value: Array<AuthMap>) => {
      const readP = value.find((item: AuthMap) => item.permission === permissionAuthorityTOEnum.READ);
      const writeP = value.find((item: AuthMap) => item.permission === permissionAuthorityTOEnum.WRITE);
      const modifyP = value.find((item: AuthMap) => item.permission === permissionAuthorityTOEnum.MODIFY);
      const deleteP = value.find((item: AuthMap) => item.permission === permissionAuthorityTOEnum.DELETE);
      const readR = data?.authorities.find((item: AuthorityTO) => item.id === readP?.id);
      const writeR = data?.authorities.find((item: AuthorityTO) => item.id === writeP?.id);
      const modifyR = data?.authorities.find((item: AuthorityTO) => item.id === modifyP?.id);
      const deleteR = data?.authorities.find((item: AuthorityTO) => item.id === deleteP?.id);

      return new FormGroup({
        description: new FormControl<string | undefined>(readP?.description),
        type: new FormControl<domainEnum | undefined>(readP?.type),
        read: new FormControl<boolean>(!!readR),
        write: new FormControl<boolean>(!!writeR),
        modify: new FormControl<boolean>(!!modifyR),
        delete: new FormControl<boolean>(!!deleteR),
        read_id: new FormControl<number | null>(readP ? readP.id : null),
        write_id: new FormControl<number | null>(writeP ? writeP.id : null),
        modify_id: new FormControl<number | null>(modifyP ? modifyP.id : null),
        delete_id: new FormControl<number | null>(deleteP ? deleteP.id : null)
      });
    }));

    this.form = new FormGroup({
      name: new FormControl<string>(data?.name, Validators.required),
      description: new FormControl<string>(data?.description, Validators.required),
      operationArea: new FormControl<operationAreaRoleEnum>(data?.operationArea, Validators.required),
      authorities: this.authorities
    });
  }

  override save(): void {
    const authorities = flatMap(map(this.form.value.authorities, (m) => {
      const permission = [];
      if (m.read) {
        permission.push(m.read_id);
      }
      if (m.write) {
        permission.push(m.write_id);
      }
      if (m.modify) {
        permission.push(m.modify_id);
      }
      if (m.delete) {
        permission.push(m.delete_id);
      }
      return permission;
    }));
    !this.config.data ?
      this.service.create({...this.form.value, authorities}) :
      this.service.update({id: this.config.data.id, ...this.form.value, authorities});
  }
}
