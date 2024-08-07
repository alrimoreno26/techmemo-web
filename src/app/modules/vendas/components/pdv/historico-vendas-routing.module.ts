import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HistoricoVendasComponent} from "./historico-vendas.component";

const routes: Routes = [
    {
        path: '', component: HistoricoVendasComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoricoVendasRoutingModule {
}
