import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FinancialComponent} from "./financial.component";

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
                path: 'structure-dre',
                data: {name: 'Estrutura DRE'},
                loadChildren: () => import('./structure-dre/structure-dre.module').then(c => c.StructureDreModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancialRoutingModule {
}
