import {NgModule} from "@angular/core";
import {PurchasesComponent} from "./purchases.component";
import {DataTableModule} from "../../standalone/data-table/data-table.module";
import {PipesModule} from "../../core/pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";
import {StorePurchasesServices} from "./services/store.purchases.services";
import {PurchasesRoutingModule} from "./purchases-routing.module";
import {CommonModule} from "@angular/common";
import {MFinancialTransactionsComponent} from "./modals/m-financial-transactions/m-financial-transactions.component";
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
import {MContasPagarComponent} from "./modals/m-contas-pagar/m-contas-pagar.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FinancialClasificationService} from "../financial/service/financial-clasification.service";
import {InputTextModule} from "primeng/inputtext";
import {TagModule} from "primeng/tag";
import {MEditParcelasComponent} from "./modals/m-edit-parcelas/m-edit-parcelas.component";
import {PaginatorModule} from "primeng/paginator";
import {SelectButtonModule} from "primeng/selectbutton";
import {FinancialTransactionsServices} from "./services/financial-transactions.services";
import {ProductService} from "../inventory/product/services/product.service";
import {reducerProduct} from "../inventory/product/store/product.reducers";
import {reducerUnitsMeasurements} from "../configuracion/unidade/store/unidade.reducers";
import {ProductEffects} from "../inventory/product/store/product.effects";
import {UnidadeEffects} from "../configuracion/unidade/store/unidade.effects";
import {UnidadeService} from "../configuracion/unidade/services/unidade.service";
import {StoreCategoryService} from "../inventory/category/services/store.category.service";
import {MNewProductComponent} from "./modals/m-new-product/m-new-product.component";
import {StepperModule} from "primeng/stepper";
import {InstallmentsComponent} from "./components/c-installsments/installments.component";
import {BadgeModule} from "primeng/badge";

@NgModule({
    declarations: [
        PurchasesComponent,
        ContasPagarComponents,
        MFinancialTransactionsComponent,
        MContasPagarComponent,
        MEditParcelasComponent,
        InstallmentsComponent,
        MNewProductComponent
    ],
    imports: [
        CommonModule,
        DataTableModule,
        PipesModule,
        TranslateModule,
        PurchasesRoutingModule,
        StoreModule.forFeature('product', reducerProduct),
        StoreModule.forFeature('unitsMeasurements', reducerUnitsMeasurements),
        StoreModule.forFeature('fornecedores', reducerFornecedores),
        EffectsModule.forFeature([ProductEffects, UnidadeEffects, FornecedoresEffects]),
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
        DividerModule,
        InputSwitchModule,
        InputTextareaModule,
        InputTextModule,
        TagModule,
        PaginatorModule,
        SelectButtonModule,
        StepperModule,
        BadgeModule
    ],
    providers:[
        StoreContasPagarServices,
        StorePurchasesServices,
        Stock_TransferStore,
        PaymentMethodService,
        SupplierService,
        ProductService,
        StoreCategoryService,
        UnidadeService,
        FinancialClasificationService,
        FinancialTransactionsServices
    ],
    exports:[],
})

export class PurchasesModule {
}
