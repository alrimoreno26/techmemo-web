import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AppConfig, LayoutState} from "../../core/models/layout";


@Injectable({
    providedIn: 'root',
})
export class LayoutService {

    config: AppConfig = {
        ripple: true,
        inputStyle: 'outlined',
        menuMode: 'slim',
        colorScheme: 'light',
        theme: 'white',
        scale: 14,
        menuTheme: 'white'
    };

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        rightMenuVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        searchBarActive: false,
        sidebarActive: false,
        anchored: false
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    public closePDV = new Subject<boolean>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    closePDV$ = this.closePDV.asObservable();

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;

            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    userConfigVisuals(config: any) {
        this.config = config;
        this.configUpdate.next(this.config);
    }


    replaceThemeLink(href: string, targetId: string, onComplete?: Function) {
        const id = targetId;
        const targetLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>targetLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        targetLink.parentNode!.insertBefore(cloneLinkElement, targetLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            targetLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete && onComplete();
        });
    }

    onOverlaySubmenuOpen() {
        this.overlayOpen.next(null);
    }

    showRightMenu() {
        this.state.rightMenuVisible = true;
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    toggleSearchBar() {
        this.state.searchBarActive = !this.state.searchBarActive;
    }

    isOverlay() {
        return this.config.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isSlim() {
        return this.config.menuMode === 'slim';
    }

    isCompact() {
        return this.config.menuMode === 'compact';
    }

    isHorizontal() {
        return this.config.menuMode === 'horizontal';
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this.configUpdate.next(this.config);
    }

}
