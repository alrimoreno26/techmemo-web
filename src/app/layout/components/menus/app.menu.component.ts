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
                    //this.model.push({separator: true});
                }
            } else if (item) {
                this.model.push(m);
                //this.model.push({separator: true});
            }

        });
        if (this.sessionService.userLogged.role.operationArea === 'SUPER_ADMIN'){
            this.model = this.model.slice(2)
            this.model.find((m: any) => m.label === 'Loja').items.splice(1, 1);
        }

        if(this.sessionService.userLogged.role.operationArea !== 'SUPER_ADMIN'){
            this.model.find((m: any) => m.label === 'Loja')?.items.shift();
        }
    }

    private menuAccess(roles: Array<domainEnum> = []): boolean {
        return true;
        // if (this.sessionService.userLogged.role.operationArea === 'SUPER_ADMIN')
        // const authorities: Array<AuthorityTO> = this.sessionService.userLogged.role.authorities;
        // return roles[0] === domainEnum.ALL ? true : flatMap(roles.map(r => authorities.filter(f => f.domain.type === r)))?.length > 0;
    }
}
