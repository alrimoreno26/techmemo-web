import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesComponent} from './roles.component';
import {roleResolver} from './resolvers/role.resolvers';

const routes: Routes = [{
  path: '', component: RolesComponent,
    data: {name: 'security.role.labels.role'},
  resolve: {
    entityLoaded: roleResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {
}
