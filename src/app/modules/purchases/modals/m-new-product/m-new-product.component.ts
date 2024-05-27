import {Component, OnInit} from "@angular/core";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {StorePurchasesServices} from "../../services/store.purchases.services";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    templateUrl: './m-new-product.component.html',
    styles: [`
        ::ng-deep .p-dialog .p-dialog-content {
            overflow: hidden;
        }
    `]
})
export class MNewProductComponent extends BaseModalStoreComponentDirective implements OnInit {

    constructor(private storeService: StorePurchasesServices,
                private dialogRegistryService: DialogRegistryService) {
        super(storeService);
        this.dialogRegistryService.addDialog(this.ref);

    }

    ngOnInit() {
        this.form = new FormGroup({
            amount: new FormControl('', Validators.required),
            productName: new FormControl('', Validators.required),
            value: new FormControl('', Validators.required),
        });
    }

    override save() {
        if (this.form.valid)
            this.ref.close({data: this.form.value})
    }
}
