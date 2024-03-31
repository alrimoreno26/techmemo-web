import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
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
