import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {onlyDigits} from '../../../../../core/util';
import {cellPhone} from '../../../../../core/validators/cell.validator';
import {BaseModalComponentDirective} from '../../../../../standalone/data-table/directives/base.modal.component.directive';
import {cpf} from "../../../../../core/validators/cpf.validator";

@Component({
  selector: 'm-domains-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent extends BaseModalComponentDirective implements OnInit {

  constructor(public userService: UserService) {
    super(userService);
  }

  ngOnInit(): void {
    const {data} = this.config;
    this.form = new FormGroup({
      name: new FormControl<string>(data?.name, Validators.required),
      phone: new FormControl<string>(this.cleanPhone(data?.phone), [Validators.required, cellPhone]),
      roleId: new FormControl<number>(data?.role?.id, Validators.required),
      cpf: new FormControl<string>(data?.cpf, [Validators.required, cpf]),
      email: new FormControl<string>(data?.email, [Validators.required, Validators.email])
    });
  }

  override save(): void {
    const value = this.form.value;
    value.phone = '+55' + onlyDigits(value.phone);
    value.cpf = onlyDigits(value.cpf);

    !this.config.data ?
      this.service.create(value) :
      this.service.update({id: this.config.data.id, ...value});
  }

  private cleanPhone(phone: string | null): string {
    if (phone) {
      if (phone.startsWith('+55')) {
        return phone.substring(3);
      } else {
        return phone;
      }
    }
    return '';
  }
}
