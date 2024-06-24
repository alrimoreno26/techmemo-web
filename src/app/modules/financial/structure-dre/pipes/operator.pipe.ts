import {Pipe, PipeTransform} from '@angular/core';
import {operatorConditionalOptions, operatorOptions} from '../utils';

@Pipe({
  name: 'operator'
})
export class OperatorPipe implements PipeTransform {

  transform(value: unknown, conditionals: boolean): string {
    return conditionals ?
      <string>operatorConditionalOptions.find(f => f.value === value)?.name :
        <string>operatorOptions.find(f => f.value === value)?.name;
  }
}
