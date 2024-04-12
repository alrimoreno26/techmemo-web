import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MarketComponent} from "./market.component";

const routes: Routes = [
    {
        path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketRoutingModule {
}
