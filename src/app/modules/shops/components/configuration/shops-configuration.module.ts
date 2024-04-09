import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShopsConfigurationComponent} from "./shops-configuration.component";
import {ButtonModule} from "primeng/button";
import {ShopsConfigurationRoutingModule} from "./shops-configuration-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {StyleClassModule} from "primeng/styleclass";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {ProductService} from "../../../inventory/product/services/product.service";
import {UnidadeService} from "../../../configuracion/unidade/services/unidade.service";
import {StoreCategoryService} from "../../../inventory/category/services/store.category.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {AppConfigModule} from "../../../../layout/config/app.config.module";
import {MenuModule} from "primeng/menu";
import {CommercesService} from "../../service/commerces.service";
import {RippleModule} from "primeng/ripple";
import {InputSwitchModule} from "primeng/inputswitch";

@NgModule({
    declarations: [
        ShopsConfigurationComponent
    ],
    imports: [
        CommonModule,
        ShopsConfigurationRoutingModule,
        ButtonModule,
        InputTextModule,
        StyleClassModule,
        FormsModule,
        InputMaskModule,
        ReactiveFormsModule,
        InputNumberModule,
        AppConfigModule,
        MenuModule,
        RippleModule,
        InputSwitchModule,
    ],
    providers:[
        ProductService,
        CommercesService,
        StoreCategoryService,
        SupplierService,
        UnidadeService
    ],
    exports:[],
})
export class ShopsConfigurationModule {
}
