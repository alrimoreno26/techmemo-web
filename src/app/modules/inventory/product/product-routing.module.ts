import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {productResolver} from "./resolvers/product.resolvers";
import {ProductBaseComponent} from "./product-base.component";

const routes: Routes = [
    {
        path: '', component: ProductBaseComponent,
        resolve: {
            entityLoaded: productResolver
        },
        children: [
            {
                path: '',
                resolve: {
                    entityLoaded: productResolver
                },
                component: ProductComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}
