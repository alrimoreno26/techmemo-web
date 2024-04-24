import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShopsComponents} from "./shops.components";
import {domainEnum} from "../../core/enums/role";
import {SuperAdminGuard} from "../../core/guards/super.admin.guard";

const routes: Routes = [
    {
        path: '', component: ShopsComponents, children: [
            {
                path: 'lista',
                data: {breadcrumb: 'Todas as lojas', roles: [domainEnum.PRODUCT]},
                canActivate: [SuperAdminGuard],
                loadChildren: () => import('./components/list/shops-list.module').then(c => c.ShopsListModule)
            },
            {
                path: 'configuration',
                loadChildren: () => import('./components/configuration/shops-configuration.module').then(c => c.ShopsConfigurationModule)
            },
            {
                path: ':name',
                loadChildren: () => import('./market/market.module').then(c => c.MarketModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopsRoutingModule {
}
