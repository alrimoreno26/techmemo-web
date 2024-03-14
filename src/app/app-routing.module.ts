import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {canActivateNotAuthGuard} from "./core/guards/not.auth.guard";
import {canActivateAuthGuard, canMatchAuthGuard} from "./core/guards/auth.guard";

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    // {
    //     path: ':name',
    //     loadChildren: () => import('./modules/shops/market/market.module').then(c => c.MarketModule)
    // },
    {
        path: 'login',
        loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule),
        canActivate: [canActivateNotAuthGuard]
    },
    {
        path: '', loadChildren: () => import('./layout/app.layout.module').then((m) => m.AppLayoutModule),
        canActivate: [canActivateAuthGuard], canMatch: [canMatchAuthGuard]
    },
    {path: '**', redirectTo: '/notfound'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
