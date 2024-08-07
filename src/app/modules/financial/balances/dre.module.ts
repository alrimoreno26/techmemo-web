import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BalancesRoutingModule} from "./balances-routing.module";
import {BalancesComponent} from "./balances.component";
import {FinancialClasificationService} from "../service/financial-clasification.service";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {BadgeModule} from "primeng/badge";
import {TranslateModule} from "@ngx-translate/core";
import {StructureDreService} from "../service/structure-dre.service";
import {TreeModule} from "primeng/tree";
import {FieldsetModule} from "primeng/fieldset";
import {ContextMenuModule} from "primeng/contextmenu";
import {TreeDragDropService} from "primeng/api";
import {FinancialClasificationModule} from "../financial-clasification/financial-clasification.module";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        BalancesComponent,
    ],
    imports: [
        CommonModule,
        BalancesRoutingModule,
        DataTableModule,
        BadgeModule,
        TranslateModule,
        TreeModule,
        FieldsetModule,
        ContextMenuModule,
        FinancialClasificationModule,
        CardModule,
        ButtonModule,
        ToolbarModule,
        CalendarModule,
        FormsModule
    ],
    providers:[
        StructureDreService,
        TreeDragDropService
    ],
    exports:[],
})
export class DreModule {
}
