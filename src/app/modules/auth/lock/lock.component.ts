import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServices} from "../../../core/services/auth.services";
import {SessionServices} from "../../../core/injects/session.services";
import {ActivatedRoute, Router} from "@angular/router";
import * as CryptoJS from "crypto-js";
import {SecurityModel, UserAuthenticated} from "../../../core/models/user";

@Component({
    selector:'app-lock',
    templateUrl: './lock.component.html',
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
export class LockComponent implements OnInit {

    /**
     * Form login
     */
    lockForm: FormGroup;

    constructor(private service: AuthServices,
                private sessionService: SessionServices,
                private route: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone) {
    }

    ngOnInit(): void {
        this.lockForm = new FormGroup({
            username: new FormControl<string>(this.sessionService.userLogged.username, [Validators.required]),
            password: new FormControl<string>('', Validators.required)
        });
    }

    login(): void {
        let {username, password} = this.lockForm.value;
        const {returnUrl} = this.route.snapshot.queryParams;
        password = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
        this.ngZone.run(() => this.service.login({username, password}).subscribe(
            (res: SecurityModel) => {
                this.sessionService.setUserLogged(res);
                this.ngZone.run(() => this.service.profile().subscribe((user: UserAuthenticated) => {
                    this.sessionService.addBasicInfo(user);
                    this.router.navigateByUrl(returnUrl).then();
                }));
            },
            () => {
            }));
    }
}
