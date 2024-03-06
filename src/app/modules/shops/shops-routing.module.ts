import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShopsComponents} from "./shops.components";

const routes: Routes = [
    {
        path: '', component: ShopsComponents, children: [
            {
                path: 'configuration',
                loadChildren: () => import('./configuration/shops-configuration.module').then(c => c.ShopsConfigurationModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopsRoutingModule {
}
