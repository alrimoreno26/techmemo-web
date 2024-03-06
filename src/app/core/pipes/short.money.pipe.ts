import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortMoney'
})
export class ShortMoneyPipe implements PipeTransform {

  /**
   * Transform input value in compact format
   * @param value string or number
   * @return An string in format 999 | 9.9mil | 9.9 mi | 9.9 bi
   */
  transform(value: number | string | undefined): number | string {
    return new Intl.NumberFormat('pt', {notation: 'compact', maximumSignificantDigits: 3})
      .format(parseFloat(value ? value.toString() : '0'));
  }
}
