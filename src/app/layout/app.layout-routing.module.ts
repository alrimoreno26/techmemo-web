import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './app.layout.component';
import {canActivateControlGuard} from "../core/guards/control.guard";
import {domainEnum} from "../core/enums/role";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            //{path: '', modals: AppLayoutComponent},
            {
                path: 'painel',
                data: {breadcrumb: 'Painel Geral', roles: [domainEnum.PRODUCT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/dashboard/dashboards.module').then(m => m.DashboardsModule)
            },
            {
                path: 'cozinha',
                data: {breadcrumb: 'Cozinha', roles: [domainEnum.KITCHEN]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/kitchen/kitchen.module').then(m => m.KitchenModule)
            },
            {
                path: 'inventory',
                data: {breadcrumb: 'Inventário', roles: [domainEnum.PRODUCT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/inventory/inventory.module').then(m => m.InventoryModule)
            },
            {
                path: 'configurations',
                data: {breadcrumb: 'Configurações', roles: [domainEnum.CONFIGURATION]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
            },
            {
                path: 'loja',
                data: {breadcrumb: 'Loja', roles: [domainEnum.CONFIGURATION,domainEnum.ALL]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/shops/shops.module').then(m => m.ShopsModule)
            },
            {
                path: 'vendas',
                data: {breadcrumb: 'Vendas', roles: [domainEnum.POS,domainEnum.ORDER,domainEnum.PAYMENT,domainEnum.PRODUCT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/vendas/vendas.module').then(m => m.VendasModule)
            },
            {
                path: 'compras',
                data: {breadcrumb: 'Compras', roles: [domainEnum.CONFIGURATION]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/purchases/purchases.module').then(m => m.PurchasesModule)
            },
            // {
            //     path: 'transfer',
            //     data: {breadcrumb: 'Transferencias de Compra', roles: [domainEnum.PRODUCT]},
            //     canActivate: [canActivateControlGuard],
            //     loadChildren: () => import('../modules/transfer/transfer.module').then(m => m.TransferModule)
            // },
            {
                path: 'financial',
                data: {breadcrumb: 'Financeiro', roles: [domainEnum.CONFIGURATION]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('../modules/financial/financial.module').then(m => m.FinancialModule)
            },
            {
                path: 'comandas',
                data: {breadcrumb: 'Comandas', roles: [domainEnum.POS,domainEnum.ORDER,domainEnum.PAYMENT,domainEnum.PRODUCT]},
                canActivate: [canActivateControlGuard],
                loadChildren: () => import('./../modules/caixa/caixa.module').then(m => m.CaixaModule)
            },
            {
                path: 'security',
                data: {breadcrumb: 'Segurança', roles: [domainEnum.USER,domainEnum.ALL]},
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
