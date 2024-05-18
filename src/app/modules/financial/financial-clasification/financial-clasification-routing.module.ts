import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FinancialClasificationComponent} from "./financial-clasification.component";

const routes: Routes = [
    {
        path: '', component: FinancialClasificationComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancialClasificationRoutingModule {
}
