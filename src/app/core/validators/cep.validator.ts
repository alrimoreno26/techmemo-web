import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

declare var jsbrasil: any;

/**
 * Validate input value is an CEP valid
 * @param control {@link AbstractControl}
 * @return An object or null
 */
export const cep: ValidatorFn = (control: AbstractControl): { [p: string]: boolean } | null => {
  if (jsbrasil.utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v: string = control.value;
  return jsbrasil.validateBr.cep(v) ? null : {cep: true};
};
