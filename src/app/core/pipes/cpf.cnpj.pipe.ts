import {Pipe, PipeTransform} from '@angular/core';

declare var jsbrasil: any;

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  /**
   * Transform input value in CPF or CNPJ format
   * @param value string or number
   * @return An string in format 999.999.999-99
   */
  transform(value: any): string {
    return value?.length === 11 ? jsbrasil.maskBr.cpf(value) : jsbrasil.maskBr.cnpj(value);
  }
}
