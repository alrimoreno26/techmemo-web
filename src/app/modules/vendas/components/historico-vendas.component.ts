import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {StoreVendasServices} from "../service/store.vendas.services";
import {StoreDashboardServices} from "../../dashboard/services/dashboard.services";
import {SessionServices} from "../../../core/injects/session.services";

@Component({
    selector: 'c-historico-vendas',
    templateUrl: './historico-vendas.component.html',
    styleUrls: ['./historico-vendas.component.scss']
})
export class HistoricoVendasComponent extends BaseComponentDirective implements OnInit {

    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), 11, 31)];

    statuses = [
        {value: "PAID", label: "Pago"},
        {value: "IN_PAYMENT", label: "En Pagamento"},
        {value: "ACTIVE", label: "Ativa"},
        {value: "CANCELLED", label: "Cancelado"},
        {value: "CLOSED", label: "Fechado"},
        {value: "FINISHED", label: "Terminada"},
    ]
    statusesValue: any = '';
    metrics = [
        {
            title: 'Ativos',
            image: 'banking-1',
            value: 0
        },
        {
            title: 'Em pagamento',
            image: 'banking-2',
            value: 0
        },
        {
            title: 'Finalizado',
            image: 'banking-3',
            value: 0
        },
    ];

    constructor(public storeServices: StoreVendasServices, public store: StoreDashboardServices, public session: SessionServices) {
        super()
        this.storeServices.loadAll({lazy: {page: 0, count: 25}})
        effect(() => {
            if (this.session.getTenantId()) {
                this.store.loadOrdersStats({
                    startDate: this.formatDate(this.rangeDates[0]),
                    endDate: this.formatDate(this.rangeDates[1])
                });
            }
        });
        effect(() => {
            if (this.store.stat$()) {
                this.metrics[0].value = this.store.stat$().orderSummary.totalActive;
                this.metrics[1].value = this.store.stat$().orderSummary.totalInPayment;
                this.metrics[2].value = this.store.stat$().orderSummary.totalPaid;
            }
        });
    }

    ngOnInit() {
        console.log(new Date())

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

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Suma 1 al mes porque los meses comienzan desde 0
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
}
