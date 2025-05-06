import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './product.component';
import {RippleModule} from 'primeng/ripple';
import {ConfirmationService} from "primeng/api";
import {ProductService} from "./services/product.service";
import {StoreModule} from "@ngrx/store";
import {reducerProduct} from "./store/product.reducers";
import {EffectsModule} from "@ngrx/effects";
import {ProductEffects} from "./store/product.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {ProductBaseComponent} from "./product-base.component";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {ConfirmServices} from "../../../core/injects/confirm.services";
import {MProductComponent} from "./components/m-product/m-product.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "primeng/editor";
import {FileUploadModule} from "primeng/fileupload";
import {ChipModule} from "primeng/chip";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputNumberModule} from "primeng/inputnumber";
import {TabViewModule} from "primeng/tabview";
import {ListboxModule} from "primeng/listbox";
import {UnidadeService} from "../../configuracion/unidade/services/unidade.service";
import {reducerUnitsMeasurements} from "../../configuracion/unidade/store/unidade.reducers";
import {UnidadeEffects} from "../../configuracion/unidade/store/unidade.effects";
import {reducerFornecedores} from "../forncedores/store/fornecedores.reducers";
import {FornecedoresEffects} from "../forncedores/store/fornecedores.effects";
import {SupplierService} from "../forncedores/services/supplier.service";
import {DividerModule} from "primeng/divider";
import {StoreCategoryService} from "../category/services/store.category.service";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {BadgeModule} from "primeng/badge";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TranslateModule} from "@ngx-translate/core";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ImageModule} from "primeng/image";
import {ProductsCards} from "../../../standalone/upload-image/upload-image.component";
import {TooltipModule} from "primeng/tooltip";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {RadioButtonModule} from "primeng/radiobutton";
import {FloatLabelModule} from "primeng/floatlabel";

@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        RippleModule,
        DataTableModule,
        StoreDevtoolsModule.instrument({}),
        StoreModule.forFeature('product', reducerProduct),
        StoreModule.forFeature('unitsMeasurements', reducerUnitsMeasurements),
        StoreModule.forFeature('fornecedores', reducerFornecedores),
        EffectsModule.forFeature([ProductEffects, UnidadeEffects, FornecedoresEffects]),
        InputTextModule,
        FormsModule,
        EditorModule,
        FileUploadModule,
        ChipModule,
        DropdownModule,
        InputSwitchModule,
        InputNumberModule,
        TabViewModule,
        ListboxModule,
        DividerModule,
        ReactiveFormsModule,
        CheckboxModule,
        TableModule,
        BadgeModule,
        MultiSelectModule,
        ConfirmDialogModule,
        TranslateModule,
        AutoCompleteModule,
        ImageModule,
        ProductsCards,
        TooltipModule,
        IconFieldModule,
        InputIconModule,
        RadioButtonModule,
        FloatLabelModule,
    ],
    providers: [
        ConfirmServices,
        ConfirmationService,
        ProductService,
        UnidadeService,
        StoreCategoryService,
        SupplierService
    ],
    declarations: [ProductBaseComponent, ProductComponent, MProductComponent]
})
export class ProductModule {
}
