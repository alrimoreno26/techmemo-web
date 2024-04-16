import {
    BaseModalStoreComponentDirective
} from "../../../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'm-add-caixas',
    templateUrl: './m-add-caixas.component.html',
})
export class MAddCaixasComponent extends BaseModalStoreComponentDirective implements OnInit{
    ngOnInit(): void {
    }

}
