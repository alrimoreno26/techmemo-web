import {NgModule} from "@angular/core";
import {ShopsComponents} from "./shops.components";
import {CommonModule} from "@angular/common";
import {ShopsRoutingModule} from "./shops-routing.module";
import {ShopsConfigurationModule} from "./configuration/shops-configuration.module";
import {DialogService} from "primeng/dynamicdialog";
import {ShopsService} from "./service/shops.service";

@NgModule({
    declarations: [
        ShopsComponents
    ],
    imports: [
        CommonModule,
        ShopsRoutingModule,
        ShopsConfigurationModule
    ],
    providers: [
        DialogService,
        ShopsService
    ],
    exports: [],
})
export class ShopsModule {
}
