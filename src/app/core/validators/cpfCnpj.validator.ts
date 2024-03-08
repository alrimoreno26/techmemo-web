import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

declare var jsbrasil: any;

/**
 * Validate input value is an CPF valid
 * @param control {@link AbstractControl}
 * @return An object or null
 */
export const cpfCnpj: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (jsbrasil.utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v: string = control.value;
  return v.length === 11 ?
    jsbrasil.validateBr.cpf(v) ? null : {cpf: true} :
    jsbrasil.validateBr.cnpj(v) ? null : {cnpj: true};
};
