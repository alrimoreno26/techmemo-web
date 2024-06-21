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
import {ListboxModule} from "primeng/listbox";
import {CardModule} from "primeng/card";
import {MAddPrintersComponent} from "./components/m-add-printers/m-add-printers.component";
import {MAddCaixasComponent} from "./components/m-add-caixa/m-add-caixas.component";
import {DirectivesModule} from "../../../../core/directives/directives.module";
import {DividerModule} from "primeng/divider";
import {SelectButtonModule} from "primeng/selectbutton";
import {BadgeModule} from "primeng/badge";
import {DropdownModule} from "primeng/dropdown";
import {TranslateModule} from "@ngx-translate/core";
import {MAddBanksComponent} from "./components/m-add-banks/m-add-banks.component";
import {AccountValidateService} from "../../../../core/injects/offer-operation-bank-account-validate.service";
import {PipesModule} from "../../../../core/pipes/pipes.module";

@NgModule({
    declarations: [
        ShopsConfigurationComponent,
        MAddPrintersComponent,
        MAddBanksComponent,
        MAddCaixasComponent
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
        ListboxModule,
        CardModule,
        DirectivesModule,
        DividerModule,
        SelectButtonModule,
        BadgeModule,
        DropdownModule,
        TranslateModule,
        PipesModule,
    ],
    providers: [
        AccountValidateService,
        ProductService,
        CommercesService,
        StoreCategoryService,
        SupplierService,
        UnidadeService
    ],
    exports: [],
})
export class ShopsConfigurationModule {
}
