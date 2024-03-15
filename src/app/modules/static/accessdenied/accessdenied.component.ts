import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'p-access-denied',
    standalone: true,
    imports: [
        ButtonModule,
        RouterLink
    ],
    templateUrl: './accessdenied.component.html'
})
export class AccessdeniedComponent { }
