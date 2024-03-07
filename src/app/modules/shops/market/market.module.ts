import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MarketRoutingModule} from "./market-routing.module";
import {MarketComponent} from "./market.component";
import {StoreCategoryService} from "../../inventory/category/services/store.category.service";

@NgModule({
    declarations: [
        MarketComponent
    ],
    imports: [
        CommonModule,
        MarketRoutingModule
    ],
    providers:[
        StoreCategoryService
    ],
    exports:[],
})
export class MarketModule {
}
