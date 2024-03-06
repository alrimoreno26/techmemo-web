import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'accountant'
})
export class AccountantPipe implements PipeTransform {

  /**
   * Transform number | string to accountant number
   * @param value number | string
   * @param symbol string
   * @return An string with format (99) or 99
   */
  transform(value: number | string | undefined, symbol: string = ''): string {
    if (!value || value === 0 || value === '0' || value === '') {
      return '0' + symbol;
    } else if (value === 'N/A') {
      return value;
    }
    const parsedValue = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }).format(parseFloat(value.toString()));
    return parsedValue.includes('-') ? `(${parsedValue.slice(1)}) ${symbol}` : parsedValue + ' ' + symbol;
  }
}
