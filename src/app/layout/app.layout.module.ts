import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';
import {MenuModule} from 'primeng/menu';
import {TooltipModule} from 'primeng/tooltip';
import {StyleClassModule} from 'primeng/styleclass';
import {AppConfigModule} from './config/app.config.module';
import {AppLayoutComponent} from './app.layout.component';
import {AppSidebarComponent} from './components/sidebar/app.sidebar.component';
import {AppTopbarComponent} from './components/header/app.topbar.component';
import {AppRightMenuComponent} from './components/menus/app.rightmenu.component';
import {AppMenuComponent} from './components/menus/app.menu.component';
import {AppMenuitemComponent} from './components/menus/app.menuitem.component';
import {AppSearchComponent} from './components/search/app.search.component';
import {AppFooterComponent} from './components/footer/app.footer.component';
import {BreadcrumbComponent} from "../standalone/breadcrumb/breadcrumb.component";
import {AppLayoutRoutingModule} from "./app.layout-routing.module";
import {NotifyService} from "./service/notify.service";
import {notifyReducer} from "./store/notify.reducers";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {NotifyEffects} from "./store/notify.effects";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {DirectivesModule} from "../core/directives/directives.module";
import {CoreModule} from "../core/core.module";

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppSidebarComponent,
        AppTopbarComponent,
        AppRightMenuComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppSearchComponent,
        AppFooterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AppLayoutRoutingModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        ButtonModule,
        TooltipModule,
        RippleModule,
        MenuModule,
        RouterModule,
        DropdownModule,
        DividerModule,
        AppConfigModule,
        DialogModule,
        StyleClassModule,
        BreadcrumbComponent,
        StoreModule.forFeature('notify', notifyReducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([NotifyEffects]),
        ConfirmDialogModule,
        MessagesModule,
        ToastModule,
        DirectivesModule,
        CoreModule,
    ],
    providers: [
        NotifyService
    ]
})
export class AppLayoutModule {
}
