import {Component, effect, OnInit} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-partial-payment',
    templateUrl: './partial-payment.component.html'
})
export class MPartialPaymentComponent implements OnInit {

    listProducts: any[] = [];
    selectedProducts: any[] = [];

    constructor(public service: CaixaService,
                public ref: DynamicDialogRef,
                private dialogRegistryService: DialogRegistryService,
                public config: DynamicDialogConfig) {
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            if (service.selectedEntity$()) {
                const arrayPlano = this.service.selectedEntity$().map((p: any) =>
                    [].concat(
                        ...p.products
                            .filter((x: any) => !x.paid)
                            .map((x: any) => ({
                                ...x,
                                clientName: p.clientName,
                                tableNumber: p.tableNumber,
                                orderId: p.id
                            }))
                    )
                )
                this.listProducts = [].concat(...arrayPlano);
            }
        });
    }

    ngOnInit() {
    }

}
