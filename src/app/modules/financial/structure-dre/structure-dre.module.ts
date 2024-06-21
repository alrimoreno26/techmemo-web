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
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {StructureService} from "../service/structure.service";
import {StructureModalComponent} from "../components/structure-modal/structure-modal.component";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputTextModule} from "primeng/inputtext";
import {StructureDataComponent} from "./page/structure-data/structure-data.component";
import {FinancialClassifiersService} from "../../../core/services/financial-classifiers.service";
import {StructureDataService} from "../service/structure.data.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DropdownModule} from "primeng/dropdown";
import {SplitterModule} from "primeng/splitter";
import {NodeStructComponent} from "./page/node-struct/node-struct.component";
import {CheckboxModule} from "primeng/checkbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {AutoCompleteModule} from "primeng/autocomplete";

@NgModule({
    declarations: [
        StructureDreComponent,
        StructureModalComponent,
        StructureDataComponent,
        NodeStructComponent
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
        FinancialClasificationModule,
        InputSwitchModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule,
        SelectButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        DropdownModule,
        SplitterModule,
        CheckboxModule,
        OverlayPanelModule,
        AutoCompleteModule
    ],
    providers:[
        FinancialClassifiersService,
        FinancialClasificationService,
        StructureService,
        StructureDataService,
        StructureDreService,
        TreeDragDropService
    ],
    exports:[],
})
export class StructureDreModule {
}
