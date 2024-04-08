import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServices} from "../../../core/services/auth.services";
import {SessionServices} from "../../../core/injects/session.services";
import {SecurityModel, UserAuthenticated} from "../../../core/models/user";

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
    private returnUrl: string;

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

        // get return url from route parameters or default to '/'
        const {returnUrl} = this.route.snapshot.queryParams;
        this.returnUrl = returnUrl || '/vendas/historico';
    }

    /**
     * Launch auth if credentials is valid redirect to dashboard
     * and store authenticate user in service
     */
    login(): void {
        this.ngZone.run(() => this.service.login(this.form.value).subscribe(
            (res: SecurityModel) => {
                this.sessionService.setUserLogged(res);
                this.ngZone.run(() => this.service.profile().subscribe((user: UserAuthenticated) => {
                    this.sessionService.addBasicInfo(user);
                    this.redirectByRoleLoguin()
                }));
            },
            () => {
            }));
    }

    redirectByRoleLoguin() {
        const user = this.sessionService.userLogged;
        if (user.role.operationArea === 'SUPER_ADMIN') {
            this.router.navigateByUrl('/loja/lista').then();
        } else {
            this.router.navigateByUrl('/vendas/historico').then();
        }
    }
}
