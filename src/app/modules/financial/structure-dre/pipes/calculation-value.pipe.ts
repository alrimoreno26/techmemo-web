import { Pipe, PipeTransform } from '@angular/core';
import {CalculationTO} from "../../../../core/models/bills";

@Pipe({
  name: 'calculationValue'
})
export class CalculationValuePipe implements PipeTransform {

  transform(value?: CalculationTO): string {
    let result = '';
    if (value) {
      const {name, constant, changeSignEndValue} = value
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
