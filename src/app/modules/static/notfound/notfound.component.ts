import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {SessionServices} from "../../../core/injects/session.services";

@Component({
    selector: 'p-not-found',
    standalone: true,
    imports: [
        ButtonModule,
        RouterLink
    ],
    templateUrl: './notfound.component.html'
})
export class NotfoundComponent {

    constructor(private session: SessionServices) {

    }

    routerLink(): string {
        if (this.session.userLogged.role.operationArea === 'ADMINISTRATOR_STORE') {
            return '/vendas/historico';
        } else if (this.session.userLogged.role.operationArea === 'SUPER_ADMIN') {
            return '/loja/lista'
        }
        return '/loja/configuration'
    }
}
