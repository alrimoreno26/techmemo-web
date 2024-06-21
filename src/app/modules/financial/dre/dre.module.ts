import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DreRoutingModule} from "./dre-routing.module";
import {DreComponent} from "./dre.component";
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

@NgModule({
    declarations: [
        DreComponent,
    ],
    imports: [
        CommonModule,
        DreRoutingModule,
        DataTableModule,
        BadgeModule,
        TranslateModule,
        TreeModule,
        FieldsetModule,
        ContextMenuModule,
        FinancialClasificationModule
    ],
    providers:[
        StructureDreService,
        TreeDragDropService
    ],
    exports:[],
})
export class DreModule {
}
