import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceDashboardComponent } from './ecommerce.dashboard.component';
import { EcommerceDashboardRoutigModule } from './ecommerce.dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import {CommercesService} from "../../shops/service/commerces.service";
import {SidebarModule} from "primeng/sidebar";
import {DialogService} from "primeng/dynamicdialog";
import {UserService} from "../../security/user/services/user.service";
import {StoreModule} from "@ngrx/store";
import {ordersReducer} from "../../caixa/store/caixa.reducers";
import {reducerProduct} from "../../inventory/product/store/product.reducers";
import {reducer} from "../../security/user/store/user.reducers";
import {EffectsModule} from "@ngrx/effects";
import {CaixaEffects} from "../../caixa/store/caixa.effects";
import {ProductEffects} from "../../inventory/product/store/product.effects";
import {UserEffects} from "../../security/user/store/user.effects";

@NgModule({
    imports: [
        CommonModule,
        EcommerceDashboardRoutigModule,
        ButtonModule,
        RippleModule,
        DropdownModule,
        FormsModule,
        TableModule,
        ChartModule,
        MenuModule,
        SidebarModule,
        StoreModule.forFeature('user', reducer),
        EffectsModule.forFeature([UserEffects]),
    ],
    exports: [
        EcommerceDashboardComponent
    ],
    providers:[
        DialogService,
        UserService,
        CommercesService
    ],
    declarations: [EcommerceDashboardComponent]
})
export class EcommerceDashboardModule { }
