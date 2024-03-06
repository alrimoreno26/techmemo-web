import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {forEach} from 'lodash';

@Directive({
  selector: '[toastTranslate]'
})
export class ToastTranslateDirective implements OnInit, OnDestroy {
  private toastList: Map<string, boolean> = new Map();
  private observer: MutationObserver = new MutationObserver(() => this.updateTranslations());

  constructor(private elementRef: ElementRef,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.observer.observe(this.elementRef.nativeElement.firstChild, {attributes: true, childList: true});
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private updateTranslations(): void {
    const children: NodeListOf<HTMLSpanElement> = this.elementRef.nativeElement.firstChild.getElementsByTagName('p-toastItem');
    Array.from(children).forEach((t: HTMLElement) => {
      const className: string = t.className.split(' ').find((f: string) => f.startsWith('ng-tns-')) as string;
      if (!this.toastList.has(className)) {
        this.toastList.set(className, true);
        const list: NodeListOf<HTMLSpanElement> = t.querySelectorAll(`.p-toast-summary.${className}, .p-toast-detail.${className}`);
        forEach(list, (el: HTMLSpanElement) => el.innerText = el.innerText ? this.translate.instant(el.innerText) : '');
      }
    });
    if (children.length === 0) {
      this.toastList.clear();
    }
  }
}
