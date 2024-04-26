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
import {ChashRegisterSummaryDto} from "../../../../../core/models/commerce";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-close-caixa',
    templateUrl: './m-close-caixa.components.html'
})
export class MCloseCaixaComponents implements OnInit {

    form: FormGroup
    listUser: any[] = [];
    cashRegisterId = '';

    cashOperations: any = null;

    constructor(public session: SessionServices,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                public cashRegisterOperations: CashRegisterOperationsService,
                public cashService: CashRegisterService,private dialogRegistryService: DialogRegistryService) {
        this.dialogRegistryService.addDialog(this.ref);
        this.cashService.opened$.subscribe((opened) => {
            this.cashRegisterId = opened ? opened : '';
        });
        effect(() => {
            this.cashRegisterOperations.opened$.subscribe((opened) => {
                if (opened === null) {
                    this.cashService.setOpened(null)
                    this.ref.close()
                }
            })
            if (this.cashRegisterOperations.selectedEntity$()) {
                this.cashOperations = this.cashRegisterOperations.selectedEntity$() as ChashRegisterSummaryDto
            }
        });
    }

    ngOnInit(): void {
        this.cashRegisterOperations.getOperationsById(this.cashRegisterId);
    }

    fecharCaixa() {
        this.cashRegisterOperations.closeCashRegisterOperations(this.cashRegisterId);
    }
}
