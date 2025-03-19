import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FornecedoresBaseComponent} from "./fornecedores-base.component";
import {FornecedoresComponent} from "./fornecedores.component";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {SupplierService} from "./services/supplier.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {FornecedoresEffects} from "./store/fornecedores.effects";
import {FornecedoresRoutingModule} from "./fornecedores-routing.module";
import {ConfirmServices} from "../../../core/injects/confirm.services";
import {ConfirmationService} from "primeng/api";
import {MFornecedoresComponent} from "./components/m-fornecedores/m-fornecedores.component";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {EditorModule} from "primeng/editor";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {reducerFornecedores} from "./store/fornecedores.reducers";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputMaskModule} from "primeng/inputmask";
import {DataViewModule} from "primeng/dataview";
import {TagModule} from "primeng/tag";
import {DividerModule} from "primeng/divider";
import {SelectButtonModule} from "primeng/selectbutton";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CalendarModule} from "primeng/calendar";
import {BadgeModule} from "primeng/badge";
import {TranslateModule} from "@ngx-translate/core";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ProductService} from "../product/services/product.service";
import {reducerProduct} from "../product/store/product.reducers";
import {reducerUnitsMeasurements} from "../../configuracion/unidade/store/unidade.reducers";
import {ProductEffects} from "../product/store/product.effects";
import {UnidadeEffects} from "../../configuracion/unidade/store/unidade.effects";
import {UnidadeService} from "../../configuracion/unidade/services/unidade.service";
import {StoreCategoryService} from "../category/services/store.category.service";


@NgModule({
    imports: [
        CommonModule,
        FornecedoresRoutingModule,
        DataTableModule,
        StoreDevtoolsModule.instrument({}),
        StoreModule.forFeature('fornecedores', reducerFornecedores),
        StoreModule.forFeature('product', reducerProduct),
        StoreModule.forFeature('unitsMeasurements', reducerUnitsMeasurements),
        EffectsModule.forFeature([FornecedoresEffects,ProductEffects, UnidadeEffects]),
        InputTextModule,
        PaginatorModule,
        EditorModule,
        ButtonModule,
        RippleModule,
        InputSwitchModule,
        InputMaskModule,
        DataViewModule,
        TagModule,
        DividerModule,
        SelectButtonModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        CalendarModule,
        BadgeModule,
        TranslateModule,
        AutoCompleteModule,
    ],
    providers:[
        SupplierService,
        ConfirmServices,
        ConfirmationService,
        ProductService,
        UnidadeService,
        StoreCategoryService,
    ],
    declarations: [
        FornecedoresBaseComponent,
        FornecedoresComponent,
        MFornecedoresComponent
    ]
})
export class FornecedoresModule { }
