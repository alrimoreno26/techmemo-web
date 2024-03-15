import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {canActivateAuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'error',
    loadComponent: () => import('./error/error.component').then(m => m.ErrorComponent),
    canActivate: [canActivateAuthGuard]
  },
  {
    path: 'access-denied',
    loadComponent: () => import('./accessdenied/accessdenied.component').then(m => m.AccessdeniedComponent),
    canActivate: [canActivateAuthGuard]
  },
  {
    path: 'not-found',
    loadComponent: () => import('./notfound/notfound.component').then(m => m.NotfoundComponent),
    canActivate: [canActivateAuthGuard]
  },
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StaticModule {
}
