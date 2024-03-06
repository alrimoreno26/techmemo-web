import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FinancialComponent} from "./financial.component";

const routes: Routes = [
    {
        path: '', component: FinancialComponent, children: [
            {
                path: 'payment-method',
                loadChildren: () => import('./payment-method/payment-method.module').then(c => c.PaymentMethodModule)
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
