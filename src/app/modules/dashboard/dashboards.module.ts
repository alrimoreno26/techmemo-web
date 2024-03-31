import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardsRoutingModule} from './dashboards-routing.module';
import {StoreDashboardServices} from "./services/dashboard.services";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DashboardsRoutingModule
    ],
    providers: [
        StoreDashboardServices
    ]
})
export class DashboardsModule {
}
