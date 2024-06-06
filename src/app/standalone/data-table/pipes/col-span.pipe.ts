import {Pipe, PipeTransform} from '@angular/core';
import {HeadersTable} from '../models';

@Pipe({
  name: 'colSpan'
})
export class ColSpanPipe implements PipeTransform {

  transform(headers: HeadersTable[], expand: boolean, sort: boolean): number {
    const {length} = headers;
    if (expand && sort) {
      return length + 2;
    } else if (expand || sort) {
      return length + 1;
    }
    return length;
  }

}
