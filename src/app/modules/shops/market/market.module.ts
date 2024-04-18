import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MarketRoutingModule} from "./market-routing.module";
import {MarketComponent} from "./market.component";
import {StoreCategoryService} from "../../inventory/category/services/store.category.service";
import {FooterComponent} from "./shared/footer/footer.component";
import {HeaderComponent} from "./shared/header/header.component";
import {HomeModule} from "./components/home/home.module";

@NgModule({
    declarations: [
        MarketComponent,
    ],
    imports: [
        CommonModule,
        HomeModule,
        MarketRoutingModule
    ],
    providers:[
        StoreCategoryService
    ],
    exports:[],
})
export class MarketModule {
}
