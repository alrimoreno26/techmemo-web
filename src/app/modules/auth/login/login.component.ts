import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServices} from "../../../core/services/auth.services";
import {SessionServices} from "../../../core/injects/session.services";
import {SecurityModel, UserAuthenticated} from "../../../core/models/user";
import * as CryptoJS from 'crypto-js';

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
        this.ngZone.run(() => this.service.login({username,password}).subscribe(
            (res: SecurityModel) => {
                this.sessionService.setUserLogged(res);
                this.ngZone.run(() => this.service.profile().subscribe((user: UserAuthenticated) => {
                    this.sessionService.addBasicInfo(user);
                    this.redirectByRoleLogin()
                }));
            },
            () => {
            }));
    }

    redirectByRoleLogin() {
        const user = this.sessionService.userLogged;
        debugger
        if(user.commerces.length === 0) {
            this.router.navigateByUrl('/static/empty-store').then();
        } else {
            switch (user.role.operationArea) {
                case 'ADMINISTRATOR_STORE':
                    this.router.navigateByUrl('/loja/configuration').then();
                    break;
                case 'ATTENDANT':
                    this.router.navigateByUrl('/comandas').then();
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
