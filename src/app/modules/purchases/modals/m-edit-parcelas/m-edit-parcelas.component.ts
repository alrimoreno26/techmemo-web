import {Component, OnInit} from "@angular/core";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {StoreContasPagarServices} from "../../services/store.contas-pagar.services";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";

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
                public paymentMethodService: PaymentMethodService,
                private supplierService: SupplierService,
                private dialogRegistryService: DialogRegistryService,
                private financeService: FinancialClasificationService) {
        super(storeService);
        this.dialogRegistryService.addDialog(this.ref);

    }

    ngOnInit(): void {

    }

    getFC(key: string) {
        return this.form.get(key)?.value;
    }

}
