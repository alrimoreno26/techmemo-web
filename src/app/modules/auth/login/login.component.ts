import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServices} from "../../../core/services/auth.services";
import {SessionServices} from "../../../core/injects/session.services";
import {SecurityModel, UserAuthenticated} from "../../../core/models/user";
import * as CryptoJS from 'crypto-js';
import {CommercesServices} from "../../../core/services/commerces.services";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        i {
            opacity: 0.6;
            transition-duration: .12s;
            color: #2196F3;

            &:hover {
                opacity: 1;
            }
        }

        .w-8 {
            position: relative;
        }

        .w-8::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Ajusta la opacidad del gris */
            z-index: 1;
        }

    `]
})
export class LoginComponent implements OnInit {
    /**
     * Form login
     */
    form: FormGroup;


    constructor(private service: AuthServices,
                private sessionService: SessionServices,
                private route: ActivatedRoute,
                public commercesService: CommercesServices,
                private layout: LayoutService,
                private router: Router,
                private ngZone: NgZone) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            username: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', Validators.required)
        });
    }

    /**
     * Launch auth if credentials is valid redirect to dashboard
     * and store authenticate user in service
     */
    login(): void {
        let {username, password} = this.form.value;

        password = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
        this.ngZone.run(() => this.service.login({username, password}).subscribe(
            (res: SecurityModel) => {
                this.sessionService.setUserLogged(res);
                this.ngZone.run(() => this.service.profile().subscribe((user: UserAuthenticated) => {
                    this.sessionService.addBasicInfo(user);
                    this.commercesService.getById(user.commerces[0].commerceId).subscribe((commerce:any) => {
                        this.sessionService.setCurrentStore(commerce);
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
                        const newHref = themeLink.getAttribute('href')!.replace(this.layout.config.theme, userConfig.theme);

                        const id = 'theme-link';
                        const targetLink = <HTMLLinkElement>document.getElementById(id);
                        const cloneLinkElement = <HTMLLinkElement>targetLink.cloneNode(true);

                        cloneLinkElement.setAttribute('href', newHref);
                        cloneLinkElement.setAttribute('id', id + '-clone');

                        targetLink.parentNode!.insertBefore(cloneLinkElement, targetLink.nextSibling);
                        cloneLinkElement.setAttribute('id', id);
                        targetLink.remove();

                        this.layout.onConfigUpdate();


                        this.layout.userConfigVisuals(userConfig);
                        this.redirectByRoleLogin()
                    });

                }));
            },
            () => {
            }));
    }

    redirectByRoleLogin() {
        const user = this.sessionService.userLogged;
        if (user.commerces.length === 0) {
            this.router.navigateByUrl('/static/empty-store').then();
        } else {
            switch (user.role.operationArea) {
                case 'ADMINISTRATOR_STORE':
                    this.router.navigateByUrl('/loja/configuration').then();
                    break;
                case 'ATTENDANT':
                    this.router.navigateByUrl('/comandas').then();
                    break;
                case 'KITCHEN':
                    this.router.navigateByUrl('/cozinha').then();
                    break;
                case 'SUPER_ADMIN':
                    this.router.navigateByUrl('/loja/lista').then();
                    break;
                default:
                    this.router.navigateByUrl('/vendas/historico').then();
                    break;
            }
        }
    }
}
