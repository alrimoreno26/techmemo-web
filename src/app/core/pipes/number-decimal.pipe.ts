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

    return '';
  }

}
