import {Component, effect, NgZone, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {operationAreaRoleEnum} from "../../../../../core/enums/role";
import {UserService} from "../../../../security/user/services/user.service";
import {SessionServices} from "../../../../../core/injects/session.services";
import {CashRegisterService} from "../../../../shops/service/cash-register.service";
import {CashRegisterOperationsService} from "../../../../shops/service/cash-register-operations.service";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";
import {CashRegisterExtractionsService} from "../../../../shops/service/cash-register-extractions.service";
import {ToastMessageService} from "../../../../../core/injects/toast-message.service";
import * as CryptoJS from "crypto-js";
import {SecurityModel} from "../../../../../core/models/user";
import {AuthServices} from "../../../../../core/services/auth.services";

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
                private authService: AuthServices,
                private toastMessageService: ToastMessageService,
                public cashService: CashRegisterService,
                private sessionService: SessionServices,
                private ngZone: NgZone,
                public config: DynamicDialogConfig,) {
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            if(!this.service.dialog$()){
                this.toastMessageService.showMessage("success", 'Sucesso', 'Extração realizada corretamente')
                this.dialogRegistryService.removeDialog(this.ref)
                this.ref.close()
            }
        });
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
            username: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', Validators.required),
            value: new FormControl<number>(0, Validators.required),
            description: new FormControl<string>('', Validators.required),
        });
    }

    extract(){
        if (this.form.valid){
            let {username, password} = this.form.value;

            password = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
            this.ngZone.run(() => this.authService.basic_login({username, password}).subscribe(
                (res: SecurityModel) => {
                    if (res.operationArea !== 'ADMINISTRATOR_STORE') {
                        this.toastMessageService.showMessage("error", 'Erro de permissão', 'Somente administradores podem remover produtos das comandas')
                    } else {
                        this.sessionService.setDeleteToken(res.token)
                        const data = {
                            description: this.form.value.description,
                            cashRegisterId: this.form.value.cashRegisterId,
                            value: this.form.value.value
                        }
                        this.service.create({data})

                    }
                },
                () => {
                }));

        }
    }
}
