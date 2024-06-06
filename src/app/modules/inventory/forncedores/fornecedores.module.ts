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


@NgModule({
    imports: [
        CommonModule,
        FornecedoresRoutingModule,
        DataTableModule,
        StoreDevtoolsModule.instrument({}),
        StoreModule.forFeature('fornecedores', reducerFornecedores),
        EffectsModule.forFeature([FornecedoresEffects]),
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
    ],
    providers:[
        SupplierService,
        ConfirmServices,
        ConfirmationService,
    ],
    declarations: [
        FornecedoresBaseComponent,
        FornecedoresComponent,
        MFornecedoresComponent
    ]
})
export class FornecedoresModule { }
