import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {onlyDigits} from '../../../../../core/util';
import {cellPhone} from '../../../../../core/validators/cell.validator';
import {
    BaseModalComponentDirective
} from '../../../../../standalone/data-table/directives/base.modal.component.directive';
import {cpf} from "../../../../../core/validators/cpf.validator";
import {Role} from "../../../../../core/models";
import {SessionServices} from "../../../../../core/injects/session.services";
import {operationAreaRoleEnum} from "../../../../../core/enums/role";
import {CommercesService} from "../../../../shops/service/commerces.service";

@Component({
    selector: 'm-domains-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent extends BaseModalComponentDirective implements OnInit {

    roleList: Role[] = [];

    constructor(public userService: UserService, public session: SessionServices, private commerce: CommercesService) {
        super(userService);
    }

    ngOnInit(): void {
        this.userService.roleList$.subscribe(x => {
            this.roleList = x
        })
        const {data} = this.config;
        this.form = new FormGroup({
            name: new FormControl<string>(data?.name, Validators.required),
            username: new FormControl<string>(data?.username, Validators.required),
            password: new FormControl<string>(data?.password, Validators.required),
            commerceId: new FormControl<string>(this.session.userLogged.role.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE ? this.session.userLogged.commerces[0].commerceId : null, Validators.required),
            phone: new FormControl<string>(this.cleanPhone(data?.phone), [Validators.required, cellPhone]),
            roleId: new FormControl<number>(data?.role?.id, Validators.required),
            documentId: new FormControl<string>(data?.documentId, [Validators.required, cpf]),
            email: new FormControl<string>(data?.email, [Validators.required, Validators.email])
        });
    }

    override save(): void {
        const value = this.form.value;
        value.phone = '+55' + onlyDigits(value.phone);
        value.documentId = onlyDigits(value.documentId);

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
