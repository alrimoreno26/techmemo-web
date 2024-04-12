import {Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[dialog-content]'
})
export class DialogContentDirective implements OnInit {

    @Input() styleClass = '';

    constructor(private element: ElementRef,
                private template: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef,
                private renderer: Renderer2) {
    }
    ngOnInit() {
        const content = this.element.nativeElement.parentElement.closest('.p-dialog-content');
    }
}
