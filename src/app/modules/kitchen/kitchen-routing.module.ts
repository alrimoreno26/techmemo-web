import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {KitchenComponents} from "./kitchen.components";
import {domainEnum} from "../../core/enums/role";

const routes: Routes = [
    {
        path: '',
        data: {roles: [domainEnum.KITCHEN]},
        component: KitchenComponents,
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KitchenRoutingModule {
}
