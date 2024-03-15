import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DomainsComponent} from './domains.component';
import {domainsResolvers} from "./resolvers/domains.resolvers";

const routes: Routes = [{
    path: '', component: DomainsComponent,
    resolve: {
        entityLoaded: domainsResolvers
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DomainsRoutingModule {
}
