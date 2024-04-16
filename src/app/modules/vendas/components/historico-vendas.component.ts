import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {StoreVendasServices} from "../service/store.vendas.services";

@Component({
    selector: 'c-historico-vendas',
    templateUrl: './historico-vendas.component.html',
    styleUrls: ['./historico-vendas.component.scss']
})
export class HistoricoVendasComponent extends BaseComponentDirective implements OnInit {

    rangeDates: Date[] | undefined;

    statuses = [
        {value: "PAID", label: "Pago"},
        {value: "IN_PAYMENT", label: "En Pagamento"},
        {value: "ACTIVE", label: "Ativa"},
        {value: "CANCELLED", label: "Cancelado"},
        {value: "CLOSED", label: "Fechado"},
        {value: "FINISHED", label: "Terminada"},
    ]
    statusesValue:any = '';
    metrics = [
        {
            title: 'Ativos',
            image: 'banking-1',
            value: 122
        },
        {
            title: 'Pago',
            image: 'banking-2',
            value: 122
        },
        {
            title: 'Pedidos',
            image: 'banking-3',
            value: 122
        },
    ];
    constructor(public storeServices: StoreVendasServices) {
        super()
        this.storeServices.loadAll({lazy: {page: 0, count: 25}})
    }

    ngOnInit() {
    }

    showDetails(order: any) {
        this.storeServices.getDetails(order)
        this.storeServices.getDeletedProductsFromOrder(order)
        this.storeServices.hideShow(true);
    }

    closeSidebar() {

    }

    applyFilter(type: string) {
        switch (type) {
            case 'created': {
                console.log(this.rangeDates)
            }
        }
    }
    show(el: HTMLElement) {
        el.classList.remove('hidden');
        el.classList.add('fadeindown');
    }

    hide(el: HTMLElement) {
        el.classList.add('hidden');
    }
}
