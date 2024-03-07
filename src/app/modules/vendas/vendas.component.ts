import {Component, effect, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../standalone/data-table/directives/base.component.directive";
import {StoreVendasServices} from "./service/store.vendas.services";

@Component({
    selector: 'c-vendas',
    templateUrl: './vendas.component.html',
    styleUrls: ['./vendas.component.scss']
})
export class VendasComponent {

    constructor() {

    }
}
