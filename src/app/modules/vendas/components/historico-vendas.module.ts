import {NgModule} from "@angular/core";
import {HistoricoVendasComponent} from "./historico-vendas.component";
import {HistoricoVendasRoutingModule} from "./historico-vendas-routing.module";
import {CommonModule} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {DirectivesModule} from "../../../core/directives/directives.module";
import {BadgeModule} from "primeng/badge";
import {CalendarModule} from "primeng/calendar";
import {DividerModule} from "primeng/divider";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        HistoricoVendasComponent
    ],
    imports: [
        CommonModule,
        HistoricoVendasRoutingModule,
        ConfirmDialogModule,
        DataTableModule,
        DirectivesModule,
        BadgeModule,
        CalendarModule,
        DividerModule,
        DropdownModule,
        RippleModule,
        SidebarModule,
        TableModule,
        TagModule,
        TranslateModule,
        FormsModule
    ],
    providers:[
    ],
    exports:[],
})
export class HistoricoVendasModule {
}
