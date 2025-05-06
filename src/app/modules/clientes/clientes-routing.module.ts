import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientesBaseComponent} from "./clientes-base.component";
import {ClientesComponent} from "./clientes.component";

const routes: Routes = [
    {
        path: '', component: ClientesBaseComponent,
        children: [
            {
                path: '',
                component: ClientesComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule {
}
