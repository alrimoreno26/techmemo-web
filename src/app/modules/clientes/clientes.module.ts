import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientesBaseComponent} from "./clientes-base.component";
import {ClientesComponent} from "./clientes.component";
import {ConfirmationService} from "primeng/api";
import {MClientesComponent} from "./components/m-category/m-clientes.component";
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
import {FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from "primeng/badge";
import {TranslateModule} from "@ngx-translate/core";
import {ClientesRoutingModule} from "./clientes-routing.module";
import {DataTableModule} from "../../standalone/data-table/data-table.module";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ImageModule} from "primeng/image";
import {StoreClientsService} from "./services/store-clients.service";
import {InputMaskModule} from "primeng/inputmask";
import {PasswordModule} from "primeng/password";


@NgModule({
    imports: [
        CommonModule,
        ClientesRoutingModule,
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
        InputMaskModule,
        PasswordModule
    ],
    providers:[
        StoreClientsService,
        ConfirmationService,
    ],
    declarations: [
        ClientesBaseComponent,
        ClientesComponent,
        MClientesComponent
    ]
})
export class ClientesModule { }
