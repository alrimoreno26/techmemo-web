import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PurchasesComponent} from "./purchases.component";
import {domainEnum} from "../../core/enums/role";

const routes: Routes = [
    {
        path: '', component: PurchasesComponent,
        children: [
            {
                path: 'lista',
                data: {breadcrumb: 'Listado'},
                component: PurchasesComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchasesRoutingModule {
}
