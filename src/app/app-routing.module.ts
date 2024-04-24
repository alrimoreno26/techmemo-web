import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivateNotAuthGuard} from "./core/guards/not.auth.guard";
import {canActivateAuthGuard, canMatchAuthGuard} from "./core/guards/auth.guard";


const routes: Routes = [
    {
        path: 'shops-online/:name',
        loadChildren: () => import('./modules/shops/market/market.module').then(c => c.MarketModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule),
        canActivate: [canActivateNotAuthGuard]
    },
    {
        path: 'lockscreen',
        loadChildren: () => import('./modules/auth/lock/lock.module').then(m => m.LockModule),
    },
    {
        path: 'static',
        loadChildren: () => import('./modules/static/static.module').then(m => m.StaticModule),
        canMatch: [canMatchAuthGuard]
    },
    {
        path: '', loadChildren: () => import('./layout/app.layout.module').then((m) => m.AppLayoutModule),
        canActivate: [canActivateAuthGuard], canMatch: [canMatchAuthGuard]
    },
    {path: '**', redirectTo: '/static/not-found', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{
        scrollPositionRestoration: 'top',
        onSameUrlNavigation: 'reload',
        anchorScrolling: 'disabled',
        useHash: false,
        scrollOffset: [0, 80],
        enableTracing: false,
        bindToComponentInputs: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
