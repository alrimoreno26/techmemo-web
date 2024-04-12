import {Component, effect, EventEmitter, Input, NgZone, OnInit, Output} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as CryptoJS from "crypto-js";
import {SecurityModel, UserAuthenticated} from "../../../../../core/models/user";
import {AuthServices} from "../../../../../core/services/auth.services";
import {ToastMessageService} from "../../../../../core/injects/toast-message.service";

@Component({
    selector: 'm-cancel-products',
    templateUrl: './cancel-products.components.html'
})
export class MCancelProductsComponents implements OnInit {

    form: FormGroup;

    constructor(public service: CaixaService,
                private authService: AuthServices,
                public ref: DynamicDialogRef,
                private toastMessageService: ToastMessageService,
                private ngZone: NgZone,
                public config: DynamicDialogConfig) {

    }

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', Validators.required),
            description: new FormControl<string>('', Validators.required)
        });
    }

    autorizar() {
        let {username, password} = this.form.value;

        password = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
        this.ngZone.run(() => this.authService.basic_login({username, password}).subscribe(
            (res: SecurityModel) => {
                if (res.operationArea !== 'ADMINISTRATOR_STORE') {
                    this.toastMessageService.showMessage("error", 'Erro de permissão', 'Somente administradores podem remover produtos das comandas')
                } else {
                    this.ref.close({cancel: true, data: res});
                }
            },
            () => {
            }));
    }

}
