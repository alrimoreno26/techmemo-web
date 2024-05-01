import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PurchasesComponent} from "./purchases.component";
import {domainEnum} from "../../core/enums/role";
import {ContasPagarComponents} from "./components/contas-pagar/contas-pagar.components";

const routes: Routes = [
    {
        path: '', component: PurchasesComponent,
        children: [
            {
                path: 'lista',
                data: {breadcrumb: 'Listado'},
                component: PurchasesComponent
            },
        ],
    },
    {
        path: 'contas-pagar',
        data: {breadcrumb: 'Contas a Pagar'},
        component: ContasPagarComponents
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchasesRoutingModule {
}
