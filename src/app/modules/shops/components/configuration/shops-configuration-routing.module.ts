import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShopsConfigurationComponent} from "./shops-configuration.component";

const routes: Routes = [
    {
        path: '', component: ShopsConfigurationComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopsConfigurationRoutingModule {
}
