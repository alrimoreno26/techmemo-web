import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        AppConfigModule,
        RippleModule,
        TranslateModule
    ]
})
export class LoginModule { }
