import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './app.layout.component';
import {canActivateControlGuard} from "../core/guards/control.guard";
import {domainEnum} from "../core/enums/role";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            {path: '', component: AppLayoutComponent},
            {
                path: 'painel',
                data: {breadcrumb: 'Panéis Geral', roles: [domainEnum.PRODUCT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/dashboard/dashboards.module').then(m => m.DashboardsModule)
            },
            {
                path: 'inventory',
                data: {breadcrumb: 'Inventário', roles: [domainEnum.PRODUCT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/inventory/inventory.module').then(m => m.InventoryModule)
            },
            {
                path: 'configurations',
                data: {breadcrumb: 'Configurações'},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
            },
            {
                path: 'loja',
                data: {breadcrumb: 'Loja', roles: [domainEnum.ALL,domainEnum.PRODUCT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/shops/shops.module').then(m => m.ShopsModule)
            },
            {
                path: 'vendas',
                data: {breadcrumb: 'Vendas', roles: [domainEnum.POS,domainEnum.ORDER,domainEnum.PAYMENT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/vendas/vendas.module').then(m => m.VendasModule)
            },
            {
                path: 'compras',
                data: {breadcrumb: 'Compras', roles: [domainEnum.ALL]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/purchases/purchases.module').then(m => m.PurchasesModule)
            },
            {
                path: 'financial',
                data: {breadcrumb: 'Financeiro'},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/financial/financial.module').then(m => m.FinancialModule)
            },
            {
                path: 'comandas',
                data: {breadcrumb: 'Comandas', roles: [domainEnum.POS,domainEnum.ORDER,domainEnum.PAYMENT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('./../modules/caixa/caixa.module').then(m => m.CaixaModule)
            },
            {
                path: 'security',
                data: {breadcrumb: 'Segurança'},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('./../modules/security/security.module').then(m => m.SecurityModule)
            },
            {path: '', redirectTo: '/vendas/historico', pathMatch: 'full'},
            {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLayoutRoutingModule {
}
