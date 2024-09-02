import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryBaseComponent} from "./category-base.component";
import {CategoryComponent} from "./category.component";
import {DataTableModule} from "../../../standalone/data-table/data-table.module";
import {StoreCategoryService} from "./services/store.category.service";
import {CategoryRoutingModule} from "./category-routing.module";
import {ConfirmServices} from "../../../core/injects/confirm.services";
import {ConfirmationService} from "primeng/api";
import {MCategoryComponent} from "./components/m-category/m-category.component";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {EditorModule} from "primeng/editor";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ReactiveFormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FinancialClasificationService} from "../../financial/service/financial-clasification.service";
import {FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from "primeng/badge";
import {TranslateModule} from "@ngx-translate/core";
import {ImageModule} from "primeng/image";
import {ProductsCards} from "../../../standalone/upload-image/upload-image.component";


@NgModule({
    imports: [
        CommonModule,
        CategoryRoutingModule,
        DataTableModule,
        InputTextModule,
        PaginatorModule,
        EditorModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        ToolbarModule,
        TableModule,
        DividerModule,
        DialogModule,
        ConfirmDialogModule,
        FileUploadModule,
        BadgeModule,
        TranslateModule,
        ImageModule,
        ProductsCards,
    ],
    providers:[
        FinancialClasificationService,
        StoreCategoryService,
        ConfirmServices,
        ConfirmationService,
    ],
    declarations: [
        CategoryBaseComponent,
        CategoryComponent,
        MCategoryComponent
    ]
})
export class CategoryModule { }
