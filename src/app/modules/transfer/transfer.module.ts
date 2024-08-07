import {NgModule} from "@angular/core";
import {TransferComponent} from "./transfer.component";
import {TransferRoutingModule} from "./transfer-routing.module";
import {DialogService} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PipesModule} from "../../core/pipes/pipes.module";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TranslateModule} from "@ngx-translate/core";
import {StorePurchasesServices} from "../purchases/services/store.purchases.services";
import {StoreContasPagarServices} from "../purchases/services/store.contas-pagar.services";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
    declarations: [
        TransferComponent
    ],
    imports: [
        CommonModule,
        TransferRoutingModule,
        ButtonModule,
        CurrencyPipe,
        DatePipe,
        PaginatorModule,
        PipesModule,
        RippleModule,
        SharedModule,
        TableModule,
        TagModule,
        TranslateModule,
        TooltipModule
    ],
    providers: [
        StorePurchasesServices,
        StoreContasPagarServices,
        DialogService
    ]
})

export class TransferModule {
}
