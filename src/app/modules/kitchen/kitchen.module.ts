import {NgModule} from "@angular/core";
import {KitchenRoutingModule} from "./kitchen-routing.module";
import {CommonModule} from "@angular/common";
import {KitchenComponents} from "./kitchen.components";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {StoreKitchenService} from "./service/kitchen.services";
import {PipesModule} from "../../core/pipes/pipes.module";


@NgModule({
    declarations: [
        KitchenComponents
    ],
    imports: [
        CommonModule,
        KitchenRoutingModule,
        CardModule,
        ButtonModule,
        PipesModule
    ],
    providers: [
        StoreKitchenService
    ],
    exports: [],
})
export class KitchenModule {
}
