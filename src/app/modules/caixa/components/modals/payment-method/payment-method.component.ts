import {Component, HostListener, OnInit} from "@angular/core";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {PaymentMethodService} from "../../../../financial/service/payment-method.service";
import {PaymentMethod} from "../../../../../core/enums/product";

@Component({
    selector: 'm-payment-method',
    templateUrl: './payment-method.component.html'
})
export class MPaymentMethodComponent implements OnInit {

    constructor(public paymentMethodService: PaymentMethodService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
        if (!paymentMethodService.loaded$()) {
            this.paymentMethodService.loadAll({lazy: {pageNumber: 0, pageSize: 10}})
        }
    }

    ngOnInit() {
    }

    selectPaymentMethod(paymentMethod: any) {
        console.log(paymentMethod)
        this.ref.close(paymentMethod);
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code.includes('Numpad') || event.code.includes('Digit')) {
            this.ref.close(this.paymentMethodService.listEntities$()[Number(event.key) - 1])
        }
    }
}
