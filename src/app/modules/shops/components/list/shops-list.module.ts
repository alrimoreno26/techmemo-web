import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShopsListComponent} from "./shops-list.component";
import {ButtonModule} from "primeng/button";
import {ShopsListRoutingModule} from "./shops-list-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {StyleClassModule} from "primeng/styleclass";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {AppConfigModule} from "../../../../layout/config/app.config.module";
import {BadgeModule} from "primeng/badge";
import {DataTableModule} from "../../../../standalone/data-table/data-table.module";
import {PipesModule} from "../../../../core/pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";
import {CommercesService} from "../../service/commerces.service";
import {TooltipModule} from "primeng/tooltip";
import {CommerceLeftBarComponent} from "./components/commerce-left-bar/commerce-left-bar.component";
import {MessagesModule} from "primeng/messages";
import {SkeletonModule} from "primeng/skeleton";
import {ListboxModule} from "primeng/listbox";
import {AvatarModule} from "primeng/avatar";
import {PaginatorModule} from "primeng/paginator";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {MultiSelectModule} from "primeng/multiselect";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {TreeSelectModule} from "primeng/treeselect";
import {SidebarModule} from "primeng/sidebar";
import {EcommerceDashboardModule} from "../../../dashboard/ecommerce/ecommerce.dashboard.module";
import {ReportsService} from "../../../../core/services/reports.service";
import {StoreDashboardServices} from "../../../dashboard/services/dashboard.services";
import {MAddCommerceComponent} from "./components/m-add-commerce/m-add-commerce.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {SelectButtonModule} from "primeng/selectbutton";
import {UserService} from "../../../security/user/services/user.service";
import {AutoCompleteModule} from "primeng/autocomplete";

@NgModule({
    declarations: [
        ShopsListComponent,
        CommerceLeftBarComponent,
        MAddCommerceComponent
    ],
    imports: [
        CommonModule,
        ShopsListRoutingModule,
        ButtonModule,
        InputTextModule,
        StyleClassModule,
        FormsModule,
        InputMaskModule,
        ReactiveFormsModule,
        InputNumberModule,
        AppConfigModule,
        BadgeModule,
        DataTableModule,
        PipesModule,
        TranslateModule,
        TooltipModule,
        MessagesModule,
        SkeletonModule,
        ListboxModule,
        AvatarModule,
        PaginatorModule,
        OverlayPanelModule,
        MultiSelectModule,
        CalendarModule,
        RippleModule,
        TreeSelectModule,
        SidebarModule,
        EcommerceDashboardModule,
        InputSwitchModule,
        SelectButtonModule,
        AutoCompleteModule,
    ],
    providers: [
        CommercesService,
        UserService,
        StoreDashboardServices,
        ReportsService
    ],
    exports: [],
})
export class ShopsListModule {
}
