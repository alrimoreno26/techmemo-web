import {Component, effect, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {operationAreaRoleEnum} from "../../../../../core/enums/role";
import {UserService} from "../../../../security/user/services/user.service";
import {SessionServices} from "../../../../../core/injects/session.services";
import {CashRegisterService} from "../../../../shops/service/cash-register.service";
import {CashRegisterOperationsService} from "../../../../shops/service/cash-register-operations.service";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-open-caixa',
    templateUrl: './m-open-caixa.components.html'
})
export class MOpenCaixaComponents implements OnInit {

    form: FormGroup
    listUser: any[] = [];
    listCaixas: any[] = [];

    constructor(public session: SessionServices,
                private dialogRegistryService: DialogRegistryService,
                public cashRegisterService: CashRegisterService,
                public cashRegisterOperations: CashRegisterOperationsService,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                public userService: UserService) {
        this.userService.loadBasic({pageNumber: 0, pageSize: 10})
        this.cashRegisterService.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
        effect(() => {
            this.cashRegisterService.opened$.subscribe((opened) => {
                if (opened) {
                    this.dialogRegistryService.removeDialog(this.ref);
                    this.ref.close();
                }
            })
            this.cashRegisterOperations.opened$.subscribe((opened) => {
                if (opened) {
                    this.dialogRegistryService.removeDialog(this.ref);
                    this.ref.close();
                }
            })
            this.userService.userBasic$.subscribe(user => {
                this.listUser = user.filter((u: any) => u.operationArea === operationAreaRoleEnum.POINT_OF_SALE) ?? [];
            })
            this.listCaixas = this.cashRegisterService.listEntities$() ?? [];

        });
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            cashRegisterId: new FormControl<string>(this.config.data?.id, Validators.required),
            value: new FormControl<string>(this.config.data?.value, Validators.required),
            operatorId: new FormControl<string>(this.session.userLogged.role.operationArea !== 'ADMINISTRATOR_STORE' ? this.session.userLogged.id : this.config.data?.operatorId, Validators.required),
        });
    }

    openCaixa() {
        if (this.form.valid) {
            this.cashRegisterOperations.openCaixa(this.form.value)
        }
    }
}
