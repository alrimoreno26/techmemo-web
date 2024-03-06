import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'product', data: { breadcrumb: 'Product List' }, loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
        { path: 'category', data: { breadcrumb: 'Category' }, loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
        { path: 'fornecedores', data: { breadcrumb: 'Fornecedores' }, loadChildren: () => import('./forncedores/fornecedores.module').then(m => m.FornecedoresModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
