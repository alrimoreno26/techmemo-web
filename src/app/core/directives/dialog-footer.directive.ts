import {Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[dialog-footer]'
})
export class DialogFooterDirective implements OnInit {

  @Input() styleClass = '';

  constructor(private element: ElementRef,
              private template: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    /*Extract the content dialog*/
    const content = this.element.nativeElement.parentElement.closest('.p-dialog-content');
    const className: string = content.className.split(' ').find((f: string) => f.startsWith('ng-tns-'));
    /*Load the template view*/
    const view = this.viewContainerRef.createEmbeddedView(this.template);
    /*Create a div container*/
    const div = document.createElement('div');
    div.className = `p-dialog-footer ${this.styleClass} ${className}`;
    /*Add the nodes child*/
    view.rootNodes.forEach(node => this.renderer.appendChild(div, node));
    /*Add div to the parent element*/
    content.parentElement.appendChild(div);
  }
}
