import {Component, effect, ElementRef, Input, ViewChild} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AppSidebarComponent} from '../sidebar/app.sidebar.component';
import {SessionServices} from "../../../core/injects/session.services";
import {domainEnum, operationAreaRoleEnum} from "../../../core/enums/role";
import {CommercesService} from "../../../modules/shops/service/commerces.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @Input() showMenu: boolean = true;

    constructor(public layoutService: LayoutService,
                public el: ElementRef,
                public session: SessionServices
               ) {

    }

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

    get containerTopBarWrapper() {
        return {
            'layout-topbar-slim': this.session.userLogged.role.operationArea === operationAreaRoleEnum.ATTENDANT || this.session.userLogged.role.operationArea === operationAreaRoleEnum.WAITER,
        }
    }

    protected readonly domainEnum = domainEnum;
    protected readonly operationAreaRoleEnum = operationAreaRoleEnum;
}
