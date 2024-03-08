import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

declare var jsbrasil: any;

/**
 * Validate input value is an CNPJ valid
 * @param control {@link AbstractControl}
 * @return An object or null
 */
export const cnpj: ValidatorFn = (control: AbstractControl): { [p: string]: boolean } | null => {
  if (jsbrasil.utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v: string = control.value;
  return jsbrasil.validateBr.cnpj(v) ? null : {cnpj: true};
};
