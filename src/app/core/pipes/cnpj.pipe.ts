import {Pipe, PipeTransform} from '@angular/core';

declare var jsbrasil: any;

@Pipe({
  name: 'cnpj'
})
/**
 * @deprecated use cpfCnpj pipe
 */
export class CnpjPipe implements PipeTransform {

  /**
   * Transform input value in CNPJ format
   * @param value string or number
   * @return An string in format 99.999.999/999-99
   */
  transform(value: any): string {
    return jsbrasil.maskBr.cnpj(value);
  }
}
