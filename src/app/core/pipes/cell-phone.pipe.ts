import {Pipe, PipeTransform} from '@angular/core';

declare var jsbrasil: any;

@Pipe({
  name: 'cellPhone'
})
export class CellPhonePipe implements PipeTransform {

  /**
   * Transform input value in celular format
   * @param value string or number
   * @return An string in format (99) 99999-9999
   */
  transform(value: any): string {
    if (value && value.startsWith('+55')) {
      return jsbrasil.maskBr.celular(value.slice(3));
    } else if (value && value.startsWith('55')) {
      return jsbrasil.maskBr.celular(value.slice(2));
    }
    return jsbrasil.maskBr.celular(value);
  }
}
