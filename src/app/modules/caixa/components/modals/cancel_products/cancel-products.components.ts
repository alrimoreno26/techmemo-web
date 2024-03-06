import {Component, effect, EventEmitter, Input, Output} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'm-cancel-products',
    templateUrl: './cancel-products.components.html'
})
export class MCancelProductsComponents {

    constructor(public service: CaixaService,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {

    }

}
