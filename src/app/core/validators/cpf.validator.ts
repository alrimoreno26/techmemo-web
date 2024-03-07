import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

declare var jsbrasil: any;

/**
 * Validate input value is an CPF valid
 * @param control {@link AbstractControl}
 * @return An object or null
 */
export const cpf: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (jsbrasil.utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v: string = control.value;
  return jsbrasil.validateBr.cpf(v) ? null : {cpf: true};
};
