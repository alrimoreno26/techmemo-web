import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: 'td[fontNameCol]'
})
export class FontNameColDirective implements AfterViewInit {

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit(): void {
    const {innerText} = this.element.nativeElement;
    if (innerText.length > 40) {
      this.element.nativeElement.style = 'font-size: 13px;'
    }
  }

}
