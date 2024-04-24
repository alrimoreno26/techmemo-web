import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LockComponent} from './lock.component';
import {PasswordModule} from "primeng/password";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {RippleModule} from "primeng/ripple";
import {LockRoutingModule} from "./lock-routing.module";
import {AppConfigModule} from "../../../layout/config/app.config.module";

@NgModule({
    declarations: [
        LockComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LockRoutingModule,
        PasswordModule,
        AppConfigModule,
        ButtonModule,
        TranslateModule,
        RippleModule,
    ]
})
export class LockModule {
}
