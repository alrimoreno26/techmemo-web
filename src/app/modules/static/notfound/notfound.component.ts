import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'p-not-found',
    standalone: true,
    imports: [
        ButtonModule,
        RouterLink
    ],
    templateUrl: './notfound.component.html'
})
export class NotfoundComponent { }
