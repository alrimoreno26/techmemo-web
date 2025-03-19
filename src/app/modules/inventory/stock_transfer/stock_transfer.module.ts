import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Stock_transferRoutingModule} from './stock_transfer-routing.module';
import {Stock_TransferComponent} from './stock_transfer.component';
import {RippleModule} from 'primeng/ripple';
import {ConfirmationService} from "primeng/api";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {ConfirmServices} from "../../../core/injects/confirm.services";
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
import {Stock_TransferBaseComponent} from "./stock_transfer-base.component";
import {MStock_TransferComponent} from "./components/m-stock_transfer.component";
import {CalendarModule} from "primeng/calendar";
import {Stock_TransferStore} from "./store/stock_transfer.store";
import {ProductService} from "../product/services/product.service";
import {InputTextareaModule} from "primeng/inputtextarea";
import {StockTransferService} from "../../../core/services/stock-transfer.service";

@NgModule({
    imports: [
        CommonModule,
        Stock_transferRoutingModule,
        RippleModule,
        DataTableModule,
        StoreDevtoolsModule.instrument({}),
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
        CalendarModule,
        InputTextareaModule,
    ],
    providers: [
        ConfirmServices,
        ConfirmationService,
        StockTransferService,
        Stock_TransferStore
    ],
    declarations: [Stock_TransferBaseComponent, Stock_TransferComponent,MStock_TransferComponent]
})
export class Stock_transferModule {
}
