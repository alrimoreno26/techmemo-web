import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {forEach} from 'lodash';
import {TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[confirmTranslate]'
})
export class ConfirmTranslateDirective implements OnInit, OnDestroy {
  private observer: MutationObserver = new MutationObserver(() => this.updateTranslations());

  constructor(private elementRef: ElementRef,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.observer.observe(this.elementRef.nativeElement, {attributes: true, childList: true});
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private updateTranslations(): void {
    const className: string = this.elementRef.nativeElement.className
      .split(' ')
      .find((f: string) => f.startsWith('ng-tns-'));
    const list: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
      `.p-dialog-title.${className}, .p-confirm-dialog-message.${className}, button.${className} span.p-button-label`
    );
    forEach(list, (el: HTMLSpanElement) => el.innerText = this.translate.instant(el.innerText));
  }
}
