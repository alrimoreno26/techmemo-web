import {Pipe, PipeTransform} from '@angular/core';
import {CalculationTO} from "../../../../core/models/bills";

interface Classifier {
    id: string,
    name: string,
    balanceAccountType: string
}

function isClassifier(obj: any): obj is Classifier {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.balanceAccountType === 'string'
    );
}

@Pipe({
    name: 'calculationValue'
})
export class CalculationValuePipe implements PipeTransform {

    transform(value?: CalculationTO): string {
        let result = '';
        if (value) {
            // @ts-ignore
            let { name, constant, changeSignEndValue } = isClassifier(value.classifier) ? value.classifier : value;

            if (constant) {
                result = constant.toString();
            }
            if (name) {
                result = name;
            }
            if (changeSignEndValue) {
                result = `( ${result} * -1 )`;
            }
        }
        return result;
    }

}
