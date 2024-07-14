import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {map} from 'rxjs';

@Directive({
  selector: 'span[traceBalance]'
})
export class TraceBalanceDirective implements OnInit {

  @Input() data: any;
  @Input() field!: string;
  @Input() source!: string;
  @Input() cnpj!: string;
  @Input() index!: boolean;
  traceId!: string;
  hasIcon: boolean = false;

  constructor(private dialogService: DialogService,
              private el: ElementRef<HTMLSpanElement>) {
  }

  @HostListener('click', ['$event']) onClick($event: Event): void {
    if (!this.hasIcon) {
      $event.preventDefault();
      $event.stopPropagation();
      return;
    }
    this.showData();
  }

  ngOnInit(): void {
    const end = <boolean>(this.field && (this.field.endsWith('VA') || this.field.endsWith('HA')));
    const traceId = this.getTraceId(end);
    const {sheet, leaf, class: className} = this.data;

    if (!this.index && sheet && !end && traceId) {
      this.hasIcon = true;
      this.traceId = traceId;
      const icon: HTMLElement = document.createElement('i');
      icon.className = 'mdi mdi-information-outline text-sm text-primary';
      this.el.nativeElement.appendChild(icon);
      this.el.nativeElement.className = 'cursor-pointer';
    }
    if (!this.index && !leaf && !end && !className.startsWith('balances')) {
      const val = this.data[this.field];
      const total = this.data[`${this.field}Total`];
      if (val !== total) {
        const icon: HTMLElement = document.createElement('i');
        icon.className = 'mdi mdi-alert-outline text-sm text-orange-500';
        this.el.nativeElement.appendChild(icon);
        this.el.nativeElement.className = 'cursor-pointer';
      }
    }
  }

  private showData(): void {
    const {code, name, id} = this.data;
      console.log(this.data)
  }

  private getTraceId(end: boolean): string | null {
    if (!end) {
      const start = this.field.slice(0, -5);
      return this.data[start + 'Trace'];
    }
    return null;
  }
}
