import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CaixaComponent} from './components/caixa/caixa.component';
import {OrdersComponents} from "./components/orders/orders.components";
import {caixaResolvers} from "./resolvers/caixa.resolvers";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: OrdersComponents,
            resolve: {entityLoaded: caixaResolvers}
        },
        {
            path: 'order/:identificador',
            data: {breadcrumb: 'Order'},
            component: CaixaComponent
        },
        {
            path: 'table/:identificador',
            data: {breadcrumb: 'Order'},
            component: CaixaComponent
        },
        {
            path: 'table-union/:identificador',
            data: {breadcrumb: 'Order'},
            component: CaixaComponent
        }
    ])],
    exports: [RouterModule]
})
export class CaixaRoutingModule {
}
