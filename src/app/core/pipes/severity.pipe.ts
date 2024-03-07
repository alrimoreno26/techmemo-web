import {Pipe, PipeTransform} from '@angular/core';
import {productType} from "../enums/product";

@Pipe({
  name: 'severity'
})
export class SeverityPipe implements PipeTransform {

  /**
   * Returno color of severity badge
   * @param value string
   * @return An 'success' | 'warning' | 'danger' | 'info'
   */
  transform(value: string): 'success' | 'warning' | 'danger' | 'info' {
    switch (value) {
        case productType.SIMPLE:
        case 'PAID':
        return 'success';
      case productType.COMBO:
      case 'IN_PAYMENT':
        return 'warning';
        case 'CLOSED':
            return 'danger';
      default:
        return 'info';
    }
  }
}
