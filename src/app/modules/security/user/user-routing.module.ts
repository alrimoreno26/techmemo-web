import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {userResolver} from './resolvers/user.resolvers';

const routes: Routes = [{
    path: '', component: UserComponent,
    data: {name: 'security.user.tooltip.user'},
    resolve: {
        entityLoaded: userResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
