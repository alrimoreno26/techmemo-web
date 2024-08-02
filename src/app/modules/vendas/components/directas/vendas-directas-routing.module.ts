import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VendasDirectasComponent} from "./vendas-directas.component";

const routes: Routes = [
    {
        path: '', component: VendasDirectasComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendasDirectasRoutingModule {
}
