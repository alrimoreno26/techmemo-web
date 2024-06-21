import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DreComponent} from "./dre.component";

const routes: Routes = [
    {
        path: '', component: DreComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DreRoutingModule {
}
