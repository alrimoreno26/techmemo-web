import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../standalone/data-table/directives/base.component.directive";
import {StoreVendasServices} from "./service/store.vendas.services";

@Component({
    selector: 'c-vendas',
    templateUrl: './vendas.component.html',
    styleUrls: ['./vendas.component.scss']
})
export class VendasComponent extends BaseComponentDirective implements OnInit {

    rangeDates: Date[] | undefined;

    constructor(public storeServices: StoreVendasServices) {
        super()
        this.storeServices.loadAll({lazy: {page: 0, count: 25}})
        effect(() => {
            console.log(this.storeServices.listEntities$())
        });
    }

    ngOnInit() {
    }
    showDetails(order:any){
        console.log(order)
        this.storeServices.getDetails(order)
        this.storeServices.hideShow(true);
    }
    closeSidebar(){

    }

    applyFilter(type:string){
        switch (type) {
            case 'created':{
                console.log(this.rangeDates)
            }
        }
    }

}
