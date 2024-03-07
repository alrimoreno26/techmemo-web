import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityComponent} from './security.component';

const routes: Routes = [
    {
        path: '', component: SecurityComponent,
        data: {breadcrumb: 'Segurança'},
        children: [
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
            },
            {path: '', redirectTo: 'role', pathMatch: 'full'},
            {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule {
}
