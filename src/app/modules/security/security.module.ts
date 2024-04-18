import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecurityRoutingModule} from './security-routing.module';
import {SecurityComponent} from './security.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [
        SecurityComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        SecurityRoutingModule,
    ]
})
export class SecurityModule {
}
