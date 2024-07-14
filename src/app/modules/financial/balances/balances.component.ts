import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {StructureDreService} from "../service/structure-dre.service";
import {formatDate} from "../../../core/util";

@Component({
    selector: 'c-balances',
    templateUrl: './balances.component.html',
})
export class BalancesComponent extends BaseComponentDirective implements OnInit {

    allBalances: boolean = true
    rangeDates: Date[] = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth(), 31)];

    constructor(public service: StructureDreService) {
        super();
        effect(() => {
            this.service.seeBalance$.subscribe((see) => {
                this.allBalances = see;
            });

        })
    }

    ngOnInit() {
    }

    newBalance() {
        this.service.newBalance({
            startDate: formatDate(this.rangeDates[0]),
            endDate: formatDate(this.rangeDates[1])
        });
    }

    getById(balance: any) {
        this.service.getById(balance.id)
    }

    protected readonly window = window;
}
