import {NgModule} from "@angular/core";
import {VendasDirectasComponent} from "./vendas-directas.component";
import {CommonModule} from "@angular/common";
import {DataTableModule} from "../../../../standalone/data-table/data-table.module";
import {BadgeModule} from "primeng/badge";
import {CalendarModule} from "primeng/calendar";
import {DividerModule} from "primeng/divider";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {InputSwitchModule} from "primeng/inputswitch";
import {PanelModule} from "primeng/panel";
import {RadioButtonModule} from "primeng/radiobutton";
import {StoreContasPagarServices} from "../../../purchases/services/store.contas-pagar.services";
import {StorePurchasesServices} from "../../../purchases/services/store.purchases.services";
import {Stock_TransferStore} from "../../../inventory/stock_transfer/store/stock_transfer.store";
import {PaymentMethodService} from "../../../financial/service/payment-method.service";
import {SupplierService} from "../../../inventory/forncedores/services/supplier.service";
import {ProductService} from "../../../inventory/product/services/product.service";
import {StoreCategoryService} from "../../../inventory/category/services/store.category.service";
import {UnidadeService} from "../../../configuracion/unidade/services/unidade.service";
import {FinancialClasificationService} from "../../../financial/service/financial-clasification.service";
import {FinancialTransactionsServices} from "../../../purchases/services/financial-transactions.services";
import {VendasDirectasRoutingModule} from "./vendas-directas-routing.module";
import {PipesModule} from "../../../../core/pipes/pipes.module";
import {StoreModule} from "@ngrx/store";
import {reducerProduct} from "../../../inventory/product/store/product.reducers";
import {reducerUnitsMeasurements} from "../../../configuracion/unidade/store/unidade.reducers";
import {reducerFornecedores} from "../../../inventory/forncedores/store/fornecedores.reducers";
import {EffectsModule} from "@ngrx/effects";
import {ProductEffects} from "../../../inventory/product/store/product.effects";
import {UnidadeEffects} from "../../../configuracion/unidade/store/unidade.effects";
import {FornecedoresEffects} from "../../../inventory/forncedores/store/fornecedores.effects";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {SelectButtonModule} from "primeng/selectbutton";
import {StepperModule} from "primeng/stepper";
import {ToolbarModule} from "primeng/toolbar";
import {StockTransferService} from "../../../../core/services/stock-transfer.service";

@NgModule({
    declarations: [
        VendasDirectasComponent
    ],
    imports: [
        VendasDirectasRoutingModule,
        CommonModule,
        DataTableModule,
        PipesModule,
        TranslateModule,
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
        BadgeModule,
        TooltipModule,
        ToolbarModule,
        SidebarModule
    ],
    providers:[
        StoreContasPagarServices,
        StorePurchasesServices,
        Stock_TransferStore,
        StockTransferService,
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
export class VendasDirectasModule {
}
