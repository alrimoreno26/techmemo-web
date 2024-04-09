import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of, tap} from 'rxjs';
import {SessionServices} from '../injects/session.services';
import {buildURL, getCookie} from './index';
import {ACCESS_TOKEN} from "../enums/role";
import {NgZone} from "@angular/core";
import {CommercesService} from "../../modules/shops/service/commerces.service";
import {CommercesServices} from "../services/commerces.services";
import {AppConfig, LayoutService} from "../../layout/service/app.layout.service";
import {CommerceDto} from "../models/commerce";

/**
 * This function load the current profile every time the app is load
 * @param httpClient {@link HttpClient}
 * @param session {@link SessionServices}
 * @param commercesService {@link CommercesServices}
 * @param commercesServices
 * @param layout {@link LayoutService}
 * @return An Observable
 */
export function initializeAppFactory(httpClient: HttpClient,
                                     session: SessionServices,
                                     commercesService: CommercesServices,
                                     layout: LayoutService): () => Observable<any> {
    const token = getCookie(ACCESS_TOKEN);
    if (token !== '') {
        session.setAccessToken(token);
        return () => httpClient.get(
            buildURL('/v1/users/authenticated'),
            {headers: {Authorization: `Bearer ${token}`}})
            .pipe(tap((user: any) => {
                session.setTenantId(user.commerces[0].commerceId)
                session.updateUser(user)
                commercesService.getById(user.commerces[0].commerceId).subscribe((commerce: CommerceDto) => {
                    let userConfig = {
                        ripple: true,
                        colorScheme: commerce.config ? commerce.config.colorSchemeType.toLowerCase() : 'light',
                        menuMode: commerce.config ? commerce.config.menuType.toLowerCase() : 'slim',
                        menuTheme: commerce.config ? commerce.config.componentTheme : 'darkgray',
                        scale: commerce.config ? commerce.config.scale : 14,
                        inputStyle: 'outlined',
                        theme: commerce.config ? commerce.config.theme : 'blue',
                    };
                    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
                    const newHref = themeLink.getAttribute('href')!.replace(layout.config.theme, userConfig.theme);

                    layout.replaceThemeLink(newHref, 'theme-link', () => {
                        layout.config.theme = userConfig.theme;
                        layout.onConfigUpdate();
                    });
                    layout.userConfigVisuals(userConfig);
                })

            }));
    }
    return () => of(EMPTY);
}

