import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule, NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {PipesModule} from "../../../core/pipes/pipes.module";
import {DirectivesModule} from "../../../core/directives/directives.module";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {BaseModalComponentDirective} from "../../data-table/directives/base.modal.component.directive";
import {DialogModule} from "primeng/dialog";

interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    standalone: true,
    selector: 'm-cancellation',
    imports: [CommonModule, NgForOf, ButtonModule, PipesModule, RouterLink, DirectivesModule, FormsModule, InputTextModule, PasswordModule, InputTextareaModule, RippleModule, DialogModule],
    templateUrl: './m-cancellation.component.html'
})

export class MCancellationComponent{

    @Input() cancellation: boolean;
    @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>()
    auth: boolean = false;

    constructor() {

    }

    close(){
        this.closed.emit(true);
    }

}
