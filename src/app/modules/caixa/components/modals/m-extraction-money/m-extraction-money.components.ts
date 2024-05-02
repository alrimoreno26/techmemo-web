import {Component, effect, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {operationAreaRoleEnum} from "../../../../../core/enums/role";
import {UserService} from "../../../../security/user/services/user.service";
import {SessionServices} from "../../../../../core/injects/session.services";
import {CashRegisterService} from "../../../../shops/service/cash-register.service";
import {CashRegisterOperationsService} from "../../../../shops/service/cash-register-operations.service";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";
import {CashRegisterExtractionsService} from "../../../../shops/service/cash-register-extractions.service";

@Component({
    selector: 'm-extraction-money',
    templateUrl: './m-extraction-money.components.html'
})
export class MExtractionMoneyComponents implements OnInit {

    form: FormGroup
    cashRegisterId = ''

    constructor(private dialogRegistryService: DialogRegistryService,
                public ref: DynamicDialogRef,
                public cashRegisterOperations: CashRegisterOperationsService,
                public service: CashRegisterExtractionsService,
                public cashService: CashRegisterService,
                public config: DynamicDialogConfig,) {
        this.dialogRegistryService.addDialog(this.ref);
    }

    ngOnInit() {
        this.cashService.opened$.subscribe((opened) => {
            this.cashRegisterId = opened ? opened : '';
        });
        this.cashRegisterOperations.cashRegisterId$.subscribe((opened) => {
            if (opened !== '') {
                this.cashRegisterOperations.setOpened(true)
                this.cashRegisterId = opened;
            }

        });
        this.form = new FormGroup({
            cashRegisterId: new FormControl<string>(this.cashRegisterId, Validators.required),
            value: new FormControl<number>(0, Validators.required),
            description: new FormControl<string>('', Validators.required),
        });
    }

    extract(){
        if (this.form.valid){
            this.service.create({data: this.form.value})
        }
    }
}
