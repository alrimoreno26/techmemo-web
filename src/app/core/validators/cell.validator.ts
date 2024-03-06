import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {onlyDigits} from '../util';

declare var jsbrasil: any;

/**
 * Validate input value is an cell number valid
 * @param control {@link AbstractControl}
 * @return An object or null
 */
export const cellPhone: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (jsbrasil.utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v: string = onlyDigits(control.value);
  return jsbrasil.validateBr.celular(v) ? null : {cellPhone: true};
};
