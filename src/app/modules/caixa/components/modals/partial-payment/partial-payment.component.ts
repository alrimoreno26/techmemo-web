import {Component, effect, HostListener, OnInit} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {map} from "rxjs";
import {flatMap} from "lodash";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'm-partial-payment',
    templateUrl: './partial-payment.component.html'
})
export class MPartialPaymentComponent implements OnInit {

    listProducts: any[] = [];
    selectedProducts: any[] = [];

    constructor(public service: CaixaService,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {

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
