import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './app.layout.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            // {path: '', component: AppLayoutComponent},
            // {
            //     path: '',
            //     loadChildren: () => import('./../demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule)
            // },
            {
                path: 'inventory',
                data: {breadcrumb: 'Inventário'},
                loadChildren: () => import('../modules/inventory/inventory.module').then(m => m.InventoryModule)
            },
            {
                path: 'configurations',
                data: {breadcrumb: 'Configurações'},
                loadChildren: () => import('../modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
            },
            {
                path: 'loja',
                data: {breadcrumb: 'Loja'},
                loadChildren: () => import('../modules/shops/shops.module').then(m => m.ShopsModule)
            },
            {
                path: 'vendas',
                data: {breadcrumb: 'Vendas'},
                loadChildren: () => import('../modules/vendas/vendas.module').then(m => m.VendasModule)
            },
            {
                path: 'financial',
                data: {breadcrumb: 'Financeiro'},
                loadChildren: () => import('../modules/financial/financial.module').then(m => m.FinancialModule)
            },
            {
                path: 'comandas',
                data: {breadcrumb: 'Comandas'},
                loadChildren: () => import('./../modules/caixa/caixa.module').then(m => m.CaixaModule)
            },
            {
                path: 'security',
                data: {breadcrumb: 'Comandas'},
                loadChildren: () => import('./../modules/security/security.module').then(m => m.SecurityModule)
            },
            {path: '', redirectTo: '/inventory/product', pathMatch: 'full'},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLayoutRoutingModule {
}
