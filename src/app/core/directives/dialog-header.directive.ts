import {Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[dialog-header]'
})
export class DialogHeaderDirective implements OnInit {

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
    const header: Element = document.querySelector(`.p-dialog-header.${className}`) as Element;
    /*Get the title span*/
    const span: HTMLSpanElement = header.querySelector('span') as HTMLSpanElement;
    /*Load the template view*/
    const view = this.viewContainerRef.createEmbeddedView(this.template);
    /*Create a div container*/
    const div = document.createElement('div');
    div.className = `p-dialog-title ${this.styleClass}`;
    /*Replace the span to the div container*/
    (span.parentNode as ParentNode).replaceChild(div, span);
    /*Add the nodes child*/
    view.rootNodes.forEach(node => this.renderer.appendChild(div, node));
  }
}
