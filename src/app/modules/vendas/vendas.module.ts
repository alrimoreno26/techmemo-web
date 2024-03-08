import {NgModule} from "@angular/core";
import {VendasComponent} from "./vendas.component";
import {VendasRoutingModule} from "./vendas-routing.module";
import {DialogService} from "primeng/dynamicdialog";
import {StoreVendasServices} from "./service/store.vendas.services";
import {TableModule} from "primeng/table";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {BadgeModule} from "primeng/badge";
import {PipesModule} from "../../core/pipes/pipes.module";
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";
import {TranslateModule} from "@ngx-translate/core";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";

@NgModule({
    declarations: [
        VendasComponent
    ],
    imports: [
        VendasRoutingModule,
        TableModule,
        CurrencyPipe,
        DatePipe,
        BadgeModule,
        PipesModule,
        ButtonModule,
        SidebarModule,
        CalendarModule,
        FormsModule,
        RippleModule,
        DividerModule,
        TranslateModule,
        DropdownModule,
        TagModule,
        NgForOf,
    ],
    providers:[
        StoreVendasServices,
        DialogService
    ],
    exports:[],
})
export class VendasModule {
}
