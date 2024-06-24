import {AbstractControl, FormArray, ValidatorFn} from '@angular/forms';

export const formulaValidation: ValidatorFn = (control: AbstractControl): { [p: string]: boolean } | null => {
  const formula = (control.get('calculations') as FormArray);
  const size = formula.length;
  let result = null;
  formula.controls.forEach((f, i) => {
    const {operator, calculations} = f.value;
    f.setErrors(null);
    if (size !== (i + 1)) {
      const calc = calculations[0];
      if (calc === null || (!calc.accountId && !calc.constant)) {
        f.setErrors({formula: true});
        result = {formula: true};
      }
    }
    if (!operator && size !== (i + 1)) {
      f.setErrors({operator: true});
      result = {operator: true};
    }
  });
  return result;
};
