import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {PickListModule} from 'primeng/picklist';
import {InputTextModule} from 'primeng/inputtext';
import {SplitButtonModule} from 'primeng/splitbutton';

import {PipesModule} from '../../core/pipes/pipes.module';
import {DirectivesModule} from '../../core/directives/directives.module';

import {DataTableComponent} from './data-table.component';
import {ShowValueComponent} from './components/show-value/show-value.component';

import {TableRowDirective} from './directives/table-row.directive';
import {TableFooterDirective} from './directives/table-footer.directive';
import {BaseComponentDirective} from './directives/base.component.directive';
import {TableExpansionDirective} from './directives/table-expansion.directive';
import {BaseModalComponentDirective} from './directives/base.modal.component.directive';
import {BaseModalDragComponentDirective} from './directives/base.modal.drag.component.directive';
import {BaseModalStoreComponentDirective} from './directives/base.modal.store.component.directive';

import {RowTemplatePipe} from './pipes/row-template.pipe';

import {DialogService} from 'primeng/dynamicdialog';
import {ExportDataService} from './services/export.data.service';
import {BaseStoreServices} from './class/base.store.services';
import {BaseDragServices} from './class/base.drag.services';
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {StyleClassModule} from "primeng/styleclass";


@NgModule({
  declarations: [
    DataTableComponent,
    ShowValueComponent,

    TableRowDirective,
    TableFooterDirective,
    BaseComponentDirective,
    TableExpansionDirective,
    BaseModalComponentDirective,
    BaseModalDragComponentDirective,
    BaseModalStoreComponentDirective,

    RowTemplatePipe
  ],
    imports: [
        CommonModule,
        TranslateModule,

        PipesModule,
        DirectivesModule,

        MenuModule,
        TableModule,
        PickListModule,
        InputTextModule,
        SplitButtonModule,
        DirectivesModule,
        MultiSelectModule,
        DropdownModule,
        FormsModule,
        StyleClassModule
    ],
  providers: [
    DecimalPipe, CurrencyPipe, DatePipe, DialogService,
    ExportDataService, BaseStoreServices, BaseDragServices
  ],
  exports: [
    DataTableComponent,
    TableRowDirective,
    TableFooterDirective,
    TableExpansionDirective,

    PipesModule,
    DirectivesModule
  ]
})
export class DataTableModule {
}
