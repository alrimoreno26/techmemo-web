import {Component, OnInit} from '@angular/core';
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {PaymentMethodService} from "../../service/payment-method.service";
import {TranslateModule} from "@ngx-translate/core";
import {DirectivesModule} from "../../../../core/directives/directives.module";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputSwitchModule} from "primeng/inputswitch";

@Component({
    standalone: true,
    selector: 'm-addEdit-payment-method',
    templateUrl: './add-edit-payment-method-modal.html',
    imports: [
        TranslateModule,
        DirectivesModule,
        ButtonModule,
        RippleModule,
        PaginatorModule,
        ReactiveFormsModule,
        InputTextModule,
        InputSwitchModule
    ],
    styleUrls: ['./add-edit-payment-method-modal.scss']
})
export class AddEditPaymentMethodModal extends BaseModalStoreComponentDirective implements OnInit {

    listPaymentMethod: any[] = [];
    constructor(public servicePaymentMethodService: PaymentMethodService) {
        super(servicePaymentMethodService);
    }

    ngOnInit() {
        this.listPaymentMethod = [
            { name: 'DINHEIRO', code: 'MONEY' },
            { name: 'DÉBITO', code: 'DEBIT' },
            { name: 'CREDITO', code: 'CREDIT' },
            { name: 'PIX', code: 'PIX' },
            { name: 'OUTROS', code: 'OTHERS' }
        ];

        const {data} = this.config;
        this.form = new FormGroup({
            description: new FormControl<string>(data?.description, Validators.required),
            type: new FormControl<string>(data?.type, Validators.required),
            enable: new FormControl<boolean>(data?.enable || false),
            allowsChange: new FormControl<boolean>(data?.allowsChange || false),
            mandatorySendCfe: new FormControl<boolean>(data?.mandatorySendCfe || false),
            requestAgreementInformation: new FormControl<boolean>(data?.requestAgreementInformation || false),
        });
    }

    override save(): void {
        !this.config.data ?
            this.service.create({data: this.form.value}) :
            this.service.update({data: {id: this.config.data.id, ...this.form.value}});
    }

}
