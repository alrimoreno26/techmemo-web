import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnidadeBaseComponent} from "./unidade-base.component";
import {unidadeResolvers} from "./resolvers/unidade.resolvers";
import {UnidadeComponent} from "./unidade.component";

const routes: Routes = [
    {
        path: '', component: UnidadeBaseComponent,
        resolve: {
            entityLoaded: unidadeResolvers
        },
        children: [
            {
                path: '',
                component: UnidadeComponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnidadeRoutingModule {
}
