import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tableFooter]'
})
export class TableFooterDirective {

  constructor(private templateRef: TemplateRef<any>) {
  }

  get template(): TemplateRef<any> {
    return this.templateRef;
  }
}
