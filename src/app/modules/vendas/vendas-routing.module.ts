import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VendasComponent} from "./vendas.component";

const routes: Routes = [
    {
        path: '', component: VendasComponent, children: [
            {
                path: 'historico',
                data: {breadcrumb: 'PDV'},
                loadChildren: () => import('./components/pdv/historico-vendas.module').then(c => c.HistoricoVendasModule)
            },
            {
                path: 'loja',
                data: {breadcrumb: 'Loja'},
                loadChildren: () => import('./components/directas/vendas-directas.module').then(c => c.VendasDirectasModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendasRoutingModule {
}
