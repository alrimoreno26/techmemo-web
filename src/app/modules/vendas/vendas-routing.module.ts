import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VendasComponent} from "./vendas.component";

const routes: Routes = [
    {
        path: '', component: VendasComponent, children: [
            {
                path: 'historico',
                loadChildren: () => import('./components/historico-vendas.module').then(c => c.HistoricoVendasModule)
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
