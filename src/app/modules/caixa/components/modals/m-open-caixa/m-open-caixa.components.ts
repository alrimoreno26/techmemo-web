import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PrintersService} from "../../../../shops/service/printers.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {operationAreaRoleEnum} from "../../../../../core/enums/role";
import {UserService} from "../../../../security/user/services/user.service";
import {SessionServices} from "../../../../../core/injects/session.services";

@Component({
    selector: 'm-open-caixa',
    templateUrl: './m-open-caixa.components.html'
})
export class MOpenCaixaComponents implements OnInit {

    form: FormGroup
    listUser: any[] = [];

    constructor(public session: SessionServices, public ref: DynamicDialogRef, public config: DynamicDialogConfig, public userService: UserService) {
        this.userService.loadBasic({pageSize: 10, pageNumber: 0})
        effect(() => {
            // if (!this.service.dialog$()) {
            //     this.ref.close();
            // }
            this.userService.userBasic$.subscribe(user => {
                this.listUser = user.filter((u: any) => u.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE) ?? [];
            })
        });
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            money: new FormControl<string>(this.config.data?.name, Validators.required),
        });
    }
}
