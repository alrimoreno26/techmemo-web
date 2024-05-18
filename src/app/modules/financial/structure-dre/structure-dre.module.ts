import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StructureDreRoutingModule} from "./structure-dre-routing.module";
import {StructureDreComponent} from "./structure-dre.component";
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
        StructureDreComponent,
    ],
    imports: [
        CommonModule,
        StructureDreRoutingModule,
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
export class StructureDreModule {
}
