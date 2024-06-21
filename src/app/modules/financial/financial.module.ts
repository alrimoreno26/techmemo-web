import {NgModule} from "@angular/core";
import {FinancialComponent} from "./financial.component";
import {PaymentMethodModule} from "./payment-method/payment-method.module";
import {FinancialRoutingModule} from "./financial-routing.module";
import {PaymentMethodService} from "./service/payment-method.service";
import {FinancialClassifiersService} from "../../core/services/financial-classifiers.service";
import {StructureDataService} from "./service/structure.data.service";
import {FinancialClasificationService} from "./service/financial-clasification.service";

@NgModule({
    declarations: [
        FinancialComponent
    ],
    imports: [
        FinancialRoutingModule,
        PaymentMethodModule
    ],
    providers: [
        PaymentMethodService,
        StructureDataService,
        FinancialClasificationService,
        FinancialClassifiersService
    ],
    exports: [],
})
export class FinancialModule {
}
