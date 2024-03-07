import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {path: '', loadChildren: () => import('./layout/app.layout.module').then((m) => m.AppLayoutModule)},
    {
        path: 'auth',
        data: {breadcrumb: 'Auth'},
        loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
    },
    // {
    //     path: 'landing',
    //     loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)
    // },
    {
        path: ':name',
        loadChildren: () => import('./modules/shops/market/market.module').then(c => c.MarketModule)
    },
    {
        path: 'notfound',
        loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule)
    },
    {path: '**', redirectTo: '/notfound'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
