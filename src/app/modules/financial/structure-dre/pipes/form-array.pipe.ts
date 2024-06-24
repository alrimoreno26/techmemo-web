import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';

@Pipe({
  name: 'formArray'
})
export class FormArrayPipe implements PipeTransform {

  transform(value: AbstractControl | null): AbstractControl[] {
    return value ? (value as FormArray).controls : new FormArray<any>([]).controls;
  }

}
