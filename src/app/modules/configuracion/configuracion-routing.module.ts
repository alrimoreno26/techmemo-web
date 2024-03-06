import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'unidade', data: { breadcrumb: 'Unidade' }, loadChildren: () => import('./unidade/unidade.module').then(m => m.UnidadeModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
