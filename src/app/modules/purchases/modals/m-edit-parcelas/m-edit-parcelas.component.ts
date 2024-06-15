import {Component, OnInit} from "@angular/core";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    templateUrl: './m-edit-parcelas.component.html',
    styles: [`
        ::ng-deep .p-dialog .p-dialog-content {
            height: auto;
            overflow: hidden;
        }
    `]
})
export class MEditParcelasComponent extends BaseModalStoreComponentDirective implements OnInit {


    constructor(private storeService: StoreContasPagarServices,
                private dialogRegistryService: DialogRegistryService) {
        super(storeService);
        this.dialogRegistryService.addDialog(this.ref);

    }

    ngOnInit(): void {
        console.log(this.config.data)
        this.form = new FormGroup({
            code: new FormControl<string>(this.config.data?.installmment.code, [Validators.required]),
            expirationDate: new FormControl<string>(this.config.data?.installmment.expirationDate, [Validators.required]),
            value: new FormControl<string>(this.config.data?.installmment.value, [Validators.required]),
            description: new FormControl<string>(this.config.data?.installmment.description)
        });
    }

    close() {
        this.dialogRegistryService.removeDialog(this.ref)
        this.ref.close()
    }

    override save() {
        if (this.form.valid) {
            const data = this.form.value
            this.config?.data.id ? this.storeService.saveInstallmentsBill(this.config.data.id,this.config.data.installmment.id, data) :
            this.storeService.saveInstallmentsBillBackground(this.config.data.id,this.config.data.installmment.id, data);
        }
    }
}
