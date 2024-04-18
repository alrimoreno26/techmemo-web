import {NgModule} from "@angular/core";
import {ShopsComponents} from "./shops.components";
import {CommonModule} from "@angular/common";
import {ShopsRoutingModule} from "./shops-routing.module";
import {ShopsConfigurationModule} from "./components/configuration/shops-configuration.module";
import {DialogService} from "primeng/dynamicdialog";
import {ShopsService} from "./service/shops.service";
import {StoreModule} from "@ngrx/store";
import {reducer} from "../security/user/store/user.reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "../security/user/store/user.effects";

@NgModule({
    declarations: [
        ShopsComponents
    ],
    imports: [
        CommonModule,
        ShopsRoutingModule,
        ShopsConfigurationModule,
        StoreModule.forFeature('user', reducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([UserEffects]),
    ],
    providers: [
        DialogService,
        ShopsService
    ],
    exports: [],
})
export class ShopsModule {
}
