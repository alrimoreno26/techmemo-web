import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FinancialComponent} from "./financial.component";
import {StructureDataComponent} from "./structure-dre/page/structure-data/structure-data.component";
import {structureDataResolver} from "./structure-dre/resolver/structure-data.resolver";

const routes: Routes = [
    {
        path: '', component: FinancialComponent, children: [
            {
                path: 'payment-method',
                loadChildren: () => import('./payment-method/payment-method.module').then(c => c.PaymentMethodModule)
            },
            {
                path: 'financial-clasification',
                data: {name: 'Clasificador'},
                loadChildren: () => import('./financial-clasification/financial-clasification.module').then(c => c.FinancialClasificationModule)
            },
            {
                path: 'dre',
                data: {name: 'DRE'},
                loadChildren: () => import('./dre/dre.module').then(c => c.DreModule)
            },
            {
                path: 'structure-dre',
                data: {name: 'Estrutura DRE'},
                loadChildren: () => import('./structure-dre/structure-dre.module').then(c => c.StructureDreModule)
            },
            {
                path: 'structure-data/:id',
                data: {name: 'sideBar.structureData', backUrl: true},
                resolve: {entity: structureDataResolver},
                component: StructureDataComponent
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancialRoutingModule {
}
