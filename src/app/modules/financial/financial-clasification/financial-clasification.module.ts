import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FinancialClasificationRoutingModule} from "./financial-clasification-routing.module";
import {FinancialClasificationComponent} from "./financial-clasification.component";
import {FinancialClasificationService} from "../service/financial-clasification.service";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {BadgeModule} from "primeng/badge";
import {TranslateModule} from "@ngx-translate/core";
import {SingleBalancesComponents} from "../components/single-balances/single-balances.components";
import {TreeTableModule} from "primeng/treetable";

@NgModule({
    declarations: [
        FinancialClasificationComponent,
        SingleBalancesComponents
    ],
    imports: [
        CommonModule,
        FinancialClasificationRoutingModule,
        DataTableModule,
        BadgeModule,
        TranslateModule,
        TreeTableModule
    ],
    providers:[
        FinancialClasificationService
    ],
    exports: [
        SingleBalancesComponents
    ],
})
export class FinancialClasificationModule {
}
