import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {domainEnum} from "../../../core/enums/role";
import {SessionServices} from "../../../core/injects/session.services";
import {menuList} from "./menu.list";
import {AuthorityTO} from "../../../core/models";
import {flatMap} from "lodash";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(private sessionService: SessionServices) {

    }

    ngOnInit() {
        menuList.forEach((m: any) => {
            const item = this.menuAccess(m.roles);
            if (item && m?.items?.length) {
                const children = m.items.filter((c: any) => this.menuAccess(c.roles));
                if (children.length) {
                    this.model.push({...m, items: children});
                }
            } else if (item) {
                this.model.push(m);
            }
        });
        if (this.sessionService.userLogged.role.operationArea === 'SUPER_ADMIN')
            this.model = this.model.slice(2)
    }

    private menuAccess(roles: Array<domainEnum> = []): boolean {
        if (this.sessionService.userLogged.role.operationArea === 'SUPER_ADMIN') return true;
        const authorities: Array<AuthorityTO> = this.sessionService.userLogged.role.authorities;
        return roles[0] === domainEnum.ALL ? true : flatMap(roles.map(r => authorities.filter(f => f.domain.type === r)))?.length > 0;
    }
}
