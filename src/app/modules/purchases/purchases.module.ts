import {NgModule} from "@angular/core";
import {PurchasesComponent} from "./purchases.component";
import {DataTableModule} from "../../standalone/data-table/data-table.module";
import {PipesModule} from "../../core/pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";
import {StorePurchasesServices} from "./services/store.purchases.services";
import {PurchasesRoutingModule} from "./purchases-routing.module";
import {CommonModule} from "@angular/common";
import {MPurchasesComponent} from "./modals/m-purchases.component";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Stock_TransferStore} from "../inventory/stock_transfer/store/stock_transfer.store";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {SupplierService} from "../inventory/forncedores/services/supplier.service";
import {StoreModule} from "@ngrx/store";
import {reducerFornecedores} from "../inventory/forncedores/store/fornecedores.reducers";
import {EffectsModule} from "@ngrx/effects";
import {FornecedoresEffects} from "../inventory/forncedores/store/fornecedores.effects";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {PaymentMethodService} from "../financial/service/payment-method.service";
import {InputNumberModule} from "primeng/inputnumber";
import {ContasPagarComponents} from "./components/contas-pagar/contas-pagar.components";
import {StoreContasPagarServices} from "./services/store.contas-pagar.services";
import {PanelModule} from "primeng/panel";
import {RadioButtonModule} from "primeng/radiobutton";
import {DividerModule} from "primeng/divider";

@NgModule({
    declarations: [
        PurchasesComponent,
        ContasPagarComponents,
        MPurchasesComponent
    ],
    imports: [
        CommonModule,
        DataTableModule,
        PipesModule,
        TranslateModule,
        PurchasesRoutingModule,
        StoreModule.forFeature('fornecedores', reducerFornecedores),
        EffectsModule.forFeature([FornecedoresEffects]),
        ButtonModule,
        RippleModule,
        AutoCompleteModule,
        FormsModule,
        TableModule,
        MultiSelectModule,
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        InputNumberModule,
        PanelModule,
        RadioButtonModule,
        DividerModule
    ],
    providers:[
        StoreContasPagarServices,
        StorePurchasesServices,
        Stock_TransferStore,
        PaymentMethodService,
        SupplierService
    ],
    exports:[],
})

export class PurchasesModule {
}
