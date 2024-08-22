import {Component, NgZone, OnInit} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServices} from "../../../../../core/services/auth.services";
import {ToastMessageService} from "../../../../../core/injects/toast-message.service";
import {SessionServices} from "../../../../../core/injects/session.services";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";
import {flavorsEmun} from "../../../../../core/enums/commerce";
import {Message} from "primeng/api";

@Component({
    selector: 'm-flavors-products',
    templateUrl: './flavors-products.components.html'
})
export class MFlavorsProductsComponents implements OnInit {

    form: FormGroup;

    sourceProducts!: any[];

    targetProducts: any[];

    messages: Message[] = [];

    constructor(public service: CaixaService,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig, private dialogRegistryService: DialogRegistryService) {
        this.dialogRegistryService.addDialog(this.ref);
    }

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', Validators.required),
            description: new FormControl<string>('', Validators.required)
        });
        this.targetProducts = [];
        this.sourceProducts = flavorsEmun;
        this.messages = [
            {severity: 'info', summary: 'So pode adicionar 3 sabores'},
        ];
    }

    getDisabled() {
        return this.targetProducts.length === 3;
    }

    addFlavors(){
        this.ref.close({cancel: false, flavors: this.targetProducts.join(',')});
    }

}
