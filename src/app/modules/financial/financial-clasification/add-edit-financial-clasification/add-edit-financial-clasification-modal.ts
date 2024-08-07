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
import {FinancialClasificationService} from "../../service/financial-clasification.service";
import {SelectButtonModule} from "primeng/selectbutton";
import {BalanceAccountType} from "../../../../core/enums/commerce";

@Component({
    standalone: true,
    selector: 'm-add-edit-financial-clasification',
    templateUrl: './add-edit-financial-clasification-modal.html',
    imports: [
        TranslateModule,
        DirectivesModule,
        ButtonModule,
        RippleModule,
        PaginatorModule,
        ReactiveFormsModule,
        InputTextModule,
        InputSwitchModule,
        SelectButtonModule
    ],
    styleUrls: ['./add-edit-financial-clasification-modal.scss']
})
export class AddEditFinancialClasificationModal extends BaseModalStoreComponentDirective implements OnInit {

    stateOptions: any[] = [
        {label: 'A pagar', value: 'EXPENSES'},
        {label: 'Renda', value: 'BILLING'}
    ];

    balanceAccountType: any[] = [
        {label: 'Ativo', value: BalanceAccountType.ACTIVE},
        {label: 'Pasivo', value: BalanceAccountType.PASSIVE},
        {label: 'DRE', value: BalanceAccountType.DRE},
    ];

    constructor(public financialClasificationService: FinancialClasificationService) {
        super(financialClasificationService);
    }

    ngOnInit() {
        const {data} = this.config;
        this.form = new FormGroup({
            name: new FormControl<string>(data?.name, Validators.required),
            type: new FormControl<string>(data?.type, Validators.required),
            visibleOnlyForStructures: new FormControl<string>(data?.visibleOnlyForStructures, Validators.required),
            balanceAccountType: new FormControl<string>(data?.balanceAccountType, Validators.required),
            code: new FormControl<string>(data?.code, Validators.required),
        });


    }

    override save(): void {
        !this.config.data ?
            this.service.create({data: this.form.value}) :
            this.service.update({data: {id: this.config.data.id, ...this.form.value}});
    }

}
