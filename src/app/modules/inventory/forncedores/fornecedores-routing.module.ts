import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FornecedoresBaseComponent} from "./fornecedores-base.component";
import {fornecedoresResolvers} from "./resolvers/fornecedores.resolvers";
import {FornecedoresComponent} from "./fornecedores.component";

const routes: Routes = [
    {
        path: '', component: FornecedoresBaseComponent,
        resolve: {
            entityLoaded: fornecedoresResolvers
        },
        children: [
            {
                path: '',
                component: FornecedoresComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FornecedoresRoutingModule {
}
