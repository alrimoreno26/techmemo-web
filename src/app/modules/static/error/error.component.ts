import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'p-error',
    standalone: true,
    imports: [
        ButtonModule,
        RouterLink
    ],
    templateUrl: './error.component.html'
})
export class ErrorComponent { }
