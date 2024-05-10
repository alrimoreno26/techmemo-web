import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {KitchenComponents} from "./kitchen.components";

const routes: Routes = [
    {
        path: '',
        component: KitchenComponents,
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KitchenRoutingModule {
}
