import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {domainEnum} from "../../core/enums/role";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            data: {roles: [domainEnum.PRODUCT]},
            loadChildren: () => import('./ecommerce/ecommerce.dashboard.module').then(m => m.EcommerceDashboardModule)
        },
        {
            path: 'banking',
            data: {breadcrumb: 'Banking Dashboard'},
            loadChildren: () => import('./banking/banking.dashboard.module').then(m => m.BankingDashboardModule)
        }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {
}
