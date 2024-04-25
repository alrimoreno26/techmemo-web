import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityComponent} from './security.component';
import {domainEnum} from "../../core/enums/role";
import {canActivateControlGuard} from "../../core/guards/control.guard";

const routes: Routes = [
    {
        path: '', component: SecurityComponent,
        data: {breadcrumb: 'Segurança'},
        children: [
            {
                path: 'user',
                canActivate: [canActivateControlGuard],
                data: {breadcrumb: 'Usuários', roles: [domainEnum.USER,domainEnum.ALL]},
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
            },
            {
                path: 'role',
                canActivate: [canActivateControlGuard],
                data: {breadcrumb: 'Roles',roles: [domainEnum.ROLES]},
                loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
            },
            {
                path: 'domains',
                canActivate: [canActivateControlGuard],
                data: {breadcrumb: 'Domínios',roles: [domainEnum.ROLES]},
                loadChildren: () => import('./domains/domains.module').then(m => m.DomainsModule)
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
