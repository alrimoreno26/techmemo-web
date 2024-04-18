import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {SessionServices} from "../../../core/injects/session.services";

@Component({
    selector: 'p-empty-store',
    standalone: true,
    imports: [
        ButtonModule,
        RouterLink
    ],
    providers:[SessionServices],
    templateUrl: './emptystore.component.html'
})
export class EmptystoreComponent {

    constructor(private session: SessionServices) {
    }
    getOut(){
        this.session.logout();
    }
}
