import {NgModule} from "@angular/core";
import {PaymentMethodComponent} from "./payment-method.component";
import {PaymentMethodRoutingModule} from "./payment-method-routing.module";
import {CommonModule} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {DirectivesModule} from "../../../core/directives/directives.module";

@NgModule({
    declarations: [
        PaymentMethodComponent
    ],
    imports: [
        CommonModule,
        PaymentMethodRoutingModule,
        ConfirmDialogModule,
        DataTableModule,
        DirectivesModule
    ],
    providers:[
    ],
    exports:[],
})
export class PaymentMethodModule {
}
