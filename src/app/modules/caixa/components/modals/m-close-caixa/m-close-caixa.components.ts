import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PrintersService} from "../../../../shops/service/printers.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {operationAreaRoleEnum} from "../../../../../core/enums/role";
import {UserService} from "../../../../security/user/services/user.service";
import {SessionServices} from "../../../../../core/injects/session.services";

@Component({
    selector: 'm-close-caixa',
    templateUrl: './m-close-caixa.components.html'
})
export class MCloseCaixaComponents implements OnInit {

    form: FormGroup
    listUser: any[] = [];

    constructor(public session: SessionServices, public ref: DynamicDialogRef, public config: DynamicDialogConfig, public userService: UserService) {

    }

    ngOnInit(): void {

    }
}
