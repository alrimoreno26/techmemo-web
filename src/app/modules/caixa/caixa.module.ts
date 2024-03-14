import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CaixaComponent} from './components/caixa/caixa.component';
import {CaixaRoutingModule} from './caixa-routing.module';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AvatarModule} from "primeng/avatar";
import {TableModule} from "primeng/table";
import {PipesModule} from "../../core/pipes/pipes.module";
import {TooltipModule} from "primeng/tooltip";
import {ProductsCards} from "../../standalone/product-cards/products-cards.components";
import {InputNumberModule} from "primeng/inputnumber";
import {PrintNfeComponents} from "../../standalone/print-nfe/print-nfe.components";
import {OrdersComponents} from "./components/orders/orders.components";
import {RippleModule} from "primeng/ripple";
import {KeypadComponents} from "./components/keypad/keypad.components";
import {NotifyService} from "../../layout/service/notify.service";
import {DialogModule} from "primeng/dialog";
import {DirectivesModule} from "../../core/directives/directives.module";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {MCancellationComponent} from "../../standalone/modals/m-cancellation/m-cancellation.component";
import {DividerModule} from "primeng/divider";
import {MTransferComponents} from "./components/modals/transfer/transfer.components";
import {PickListModule} from "primeng/picklist";
import {CpfNotaComponents} from "./components/modals/cpf_nota/cpf-nota.components";
import {InputMaskModule} from "primeng/inputmask";
import {BlockUIModule} from "primeng/blockui";
import {PanelModule} from "primeng/panel";
import {ordersReducer} from "./store/caixa.reducers";
import {CaixaEffects} from "./store/caixa.effects";
import {CaixaService} from "./services/caixa.service";
import {DialogService} from "primeng/dynamicdialog";
import {ProductService} from "../inventory/product/services/product.service";
import {UnidadeService} from "../configuracion/unidade/services/unidade.service";
import {StoreCategoryService} from "../inventory/category/services/store.category.service";
import {SupplierService} from "../inventory/forncedores/services/supplier.service";
import {reducerProduct} from "../inventory/product/store/product.reducers";
import {ProductEffects} from "../inventory/product/store/product.effects";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MComandaComponents} from "./components/modals/m-comanda/m-comanda.components";
import {SelectButtonModule} from "primeng/selectbutton";
import {AdditionalComponents} from "./components/modals/additionals/additional-components.component";
import {TabViewModule} from "primeng/tabview";
import {StyleClassModule} from "primeng/styleclass";
import {TagModule} from "primeng/tag";
import {StoreTablesServices} from "./services/store.tables.services";
import {ToolbarModule} from "primeng/toolbar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {MPaymentMethodComponent} from "./components/modals/payment-method/payment-method.component";
import {PaymentMethodService} from "../financial/service/payment-method.service";
import {MPartialPaymentComponent} from "./components/modals/partial-payment/partial-payment.component";
import {MCancelProductsComponents} from "./components/modals/cancel_products/cancel-products.components";
import {ToastModule} from "primeng/toast";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        CaixaRoutingModule,
        InputTextModule,
        InputTextareaModule,
        AvatarModule,
        TableModule,
        PipesModule,
        TooltipModule,
        ProductsCards,
        InputNumberModule,
        PrintNfeComponents,
        RippleModule,
        ReactiveFormsModule,
        DialogModule,
        DirectivesModule,
        StoreDevtoolsModule.instrument({}),
        StoreModule.forFeature('orders', ordersReducer),
        StoreModule.forFeature('product', reducerProduct),
        EffectsModule.forFeature([CaixaEffects, ProductEffects]),
        MCancellationComponent,
        DividerModule,
        PickListModule,
        InputMaskModule,
        BlockUIModule,
        PanelModule,
        AutoCompleteModule,
        SelectButtonModule,
        TabViewModule,
        StyleClassModule,
        TagModule,
        ToolbarModule,
        CheckboxModule,
        DropdownModule,
        ToastModule,
        TranslateModule,
    ],
    declarations: [
        CaixaComponent,
        OrdersComponents,
        KeypadComponents,
        MTransferComponents,
        CpfNotaComponents,
        MComandaComponents,
        MPaymentMethodComponent,
        MPartialPaymentComponent,
        MCancelProductsComponents,
        AdditionalComponents
    ],
    providers: [
        PaymentMethodService,
        StoreTablesServices,
        NotifyService,
        CaixaService,
        DialogService,
        ProductService,
        UnidadeService,
        StoreCategoryService,
        SupplierService,
        DatePipe
    ]
})
export class CaixaModule {
}
