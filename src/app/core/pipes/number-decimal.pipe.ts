import {ElementRef, Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'numberK'
})
export class NumberKPipe implements PipeTransform {

  constructor(private decimal: DecimalPipe,
              private elementRef: ElementRef) {
  }

  transform(row: any, field: string, numberView: [number, number], index: boolean): string | null {
    let value = row[field];
    const [currency, decimal] = numberView;
    const end: boolean = field.endsWith('VA') || field.endsWith('HA');
    const endCell: string = this.endCell(row, index, end);
    const digitsInfo: string = end ? '1.2-2' : `1.${decimal}-${decimal}`;
    if (currency > 1 && !endCell.endsWith('%') && !endCell.endsWith('x')) {
      value = value / currency;
    }
    return this.decimal.transform(value ?? 0, digitsInfo) + endCell;
  }

  endCell(value: any, index: boolean, end: boolean): string {
    const {code, prefix, suffix} = value;
    if (index && code) {
      if (code.startsWith('7') || code.startsWith('8')) {
        return '%';
      } else if (code.startsWith('10')) {
        if (code.startsWith('10.5') || code.startsWith('10.6')) {
          return '%';
        } else {
          this.elementRef.nativeElement.parentElement.className = 'text-center pl-8';
        }
      } else if (code.startsWith('11')) {
        if (code.startsWith('11.3')) {
          return 'x';
        } else {
          this.elementRef.nativeElement.parentElement.className = 'text-center pl-8';
        }
      }
    } else if (index && (prefix || suffix)) {
      if (prefix) {
        this.elementRef.nativeElement.parentElement.className = 'text-center pl-8';
      }
      if (suffix) {
        return ' ' + suffix;
      }
    } else if (end) {
      return '%'
    }
    return '';
  }

}
