import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PrintersService} from "../../../../shops/service/printers.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {operationAreaRoleEnum} from "../../../../../core/enums/role";
import {UserService} from "../../../../security/user/services/user.service";
import {SessionServices} from "../../../../../core/injects/session.services";
import {CashRegisterOperationsService} from "../../../../shops/service/cash-register-operations.service";
import {formatDate} from "../../../../../core/util";
import {CashRegisterService} from "../../../../shops/service/cash-register.service";

@Component({
    selector: 'm-close-caixa',
    templateUrl: './m-close-caixa.components.html'
})
export class MCloseCaixaComponents implements OnInit {

    form: FormGroup
    listUser: any[] = [];
    cashRegisterId = '';
    constructor(public session: SessionServices,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                public cashRegisterOperations: CashRegisterOperationsService,
                public cashService: CashRegisterService) {
        this.cashService.opened$.subscribe((opened) => {
            this.cashRegisterId = opened ? opened : '';
        });
    }

    ngOnInit(): void {
        console.log(this.cashRegisterId)
        this.cashRegisterOperations.getOperationsById(this.cashRegisterId);
    }
}
