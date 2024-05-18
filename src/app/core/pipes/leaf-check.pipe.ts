import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'leafCheck'
})
export class LeafCheckPipe implements PipeTransform {

  transform(value: any): boolean {
    const {code, leaf, parent, keepColor} = value;
    if (code) {
      const size = code.split('.').length;
      return leaf && size > 1;
    } else if (parent) {
      if (keepColor) {
        return false;
      }
      return leaf;
    }
    return false;
  }

}
