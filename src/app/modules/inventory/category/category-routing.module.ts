import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryBaseComponent} from "./category-base.component";
import {CategoryComponent} from "./category.component";

const routes: Routes = [
    {
        path: '', component: CategoryBaseComponent,
        children: [
            {
                path: '',
                component: CategoryComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule {
}
