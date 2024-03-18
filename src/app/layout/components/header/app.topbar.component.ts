import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component';
import {SessionServices} from "../../../core/injects/session.services";
import {domainEnum} from "../../../core/enums/role";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @Input() showMenu: boolean = true;
    lojas = [
        { name: 'Fabrica', code: 'FACTORY' },
        { name: 'Loja1', code: 'LOJA1' },
        { name: 'Loja2', code: 'LOJA2' },
        { name: 'Loja3', code: 'LOJA3' }
    ];
    selectedCity: any | undefined = { name: 'Fabrica', code: 'FACTORY' };
    constructor(public layoutService: LayoutService, public el: ElementRef, public session: SessionServices) { }


    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showRightMenu();
    }

    onSearchClick() {
        this.layoutService.toggleSearchBar();
    }

    onRightMenuClick() {
        this.layoutService.showRightMenu();
    }

    get logo() {
        const logo = this.layoutService.config.menuTheme === 'white' || this.layoutService.config.menuTheme === 'orange' ? 'dark' : 'white';
        return logo;
    }

    protected readonly domainEnum = domainEnum;
}
