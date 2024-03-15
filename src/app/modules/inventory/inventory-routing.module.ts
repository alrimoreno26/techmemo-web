import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'product',
            data: {breadcrumb: 'Lista de produtos'},
            loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
        },
        {
            path: 'category',
            data: {breadcrumb: 'Categorias'},
            loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
        },
        {
            path: 'proveedores',
            data: {breadcrumb: 'Fornecedores'},
            loadChildren: () => import('./forncedores/fornecedores.module').then(m => m.FornecedoresModule)
        },
        {path: '**', redirectTo: '/not-found'}
    ])],
    exports: [RouterModule]
})
export class InventoryRoutingModule {
}
