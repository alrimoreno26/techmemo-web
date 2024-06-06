import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StructureDreComponent} from "./structure-dre.component";

const routes: Routes = [
    {
        path: '', component: StructureDreComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StructureDreRoutingModule {
}
