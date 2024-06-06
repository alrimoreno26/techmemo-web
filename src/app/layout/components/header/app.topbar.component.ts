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

    selectedStore: any = null;

    lojas: any[] = [];
    selectedCommerce: any

    constructor(public layoutService: LayoutService,
                public el: ElementRef,
                public commercesService: CommercesService,
                public session: SessionServices
    ) {
        this.lojas = this.session.userLogged.commerces;
        if(this.session.getCurrentStore()){
            this.selectedCommerce = this.lojas.find((x: any) => x.commerceId === this.session.getCurrentStore().id)
        }
    }

    changeCommerce(commerce: any) {
        this.commercesService.changeCommerceByID(commerce.value.commerceId)
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
