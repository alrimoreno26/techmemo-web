import {AbstractControl, ValidatorFn} from '@angular/forms';

export function calculationValidation(last: boolean): ValidatorFn {
	return (control: AbstractControl): { [p: string]: boolean } | null => {
		const {type, accountId, constant, operator} = control.value;
		let result: any = null;
		if (accountId || constant) {
			if (type === 'account' && !accountId) {
				result = {account: true};
			}
			if (type === 'constant' && !constant) {
				result = {constant: true};
			}
			if (!operator && !last) {
				result = result ? {...result, operator: true} : {operator: true};
			}
		} else if (!last) {
			return {calculation: true};
		}
		return result;
	};
}
