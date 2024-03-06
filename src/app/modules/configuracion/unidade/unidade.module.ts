import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnidadeBaseComponent} from "./unidade-base.component";
import {UnidadeComponent} from "./unidade.component";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {UnidadeService} from "./services/unidade.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {reducerUnitsMeasurements} from "./store/unidade.reducers";
import {UnidadeEffects} from "./store/unidade.effects";
import {UnidadeRoutingModule} from "./unidade-routing.module";
import {ConfirmServices} from "../../../core/injects/confirm.services";
import {ConfirmationService} from "primeng/api";
import {MUnidadeComponent} from "./components/m-unidade/m-unidade.component";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {EditorModule} from "primeng/editor";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@NgModule({
    imports: [
        CommonModule,
        UnidadeRoutingModule,
        DataTableModule,
        StoreDevtoolsModule.instrument({}),
        StoreModule.forFeature('unitsMeasurements', reducerUnitsMeasurements),
        EffectsModule.forFeature([UnidadeEffects]),
        InputTextModule,
        PaginatorModule,
        EditorModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
    ],
    providers:[
        UnidadeService,
        ConfirmServices,
        ConfirmationService,
    ],
    declarations: [
        UnidadeBaseComponent,
        UnidadeComponent,
        MUnidadeComponent
    ]
})
export class UnidadeModule { }
