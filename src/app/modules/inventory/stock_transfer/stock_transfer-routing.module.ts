import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Stock_TransferComponent} from './stock_transfer.component';
import {Stock_TransferBaseComponent} from "./stock_transfer-base.component";

const routes: Routes = [
    {
        path: '', component: Stock_TransferBaseComponent,
        // resolve: {
        //     entityLoaded: productResolver
        // },
        children: [
            {
                path: 'estoque',
                // resolve: {
                //     entityLoaded: productResolver
                // },
                component: Stock_TransferComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Stock_transferRoutingModule {
}
