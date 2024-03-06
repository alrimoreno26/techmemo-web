import {Pipe, PipeTransform} from '@angular/core';

declare var jsbrasil: any;

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  /**
   * Transform input value in CEP format
   * @param value string or number
   * @return An string in format 99999-999
   */
  transform(value: any): string {
    return jsbrasil.maskBr.cep(value);
  }
}
