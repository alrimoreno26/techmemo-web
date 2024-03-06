import {NgModule} from "@angular/core";
import {FinancialComponent} from "./financial.component";
import {PaymentMethodModule} from "./payment-method/payment-method.module";
import {FinancialRoutingModule} from "./financial-routing.module";
import {PaymentMethodService} from "./service/payment-method.service";

@NgModule({
    declarations: [
        FinancialComponent
    ],
    imports: [
        FinancialRoutingModule,
        PaymentMethodModule
    ],
    providers:[
        PaymentMethodService
    ],
    exports:[],
})
export class FinancialModule {
}
