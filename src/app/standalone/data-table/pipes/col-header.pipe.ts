import { Pipe, PipeTransform } from '@angular/core';
import {HeadersTable} from '../models';

@Pipe({
  name: 'colHeader',
})
export class ColHeaderPipe implements PipeTransform {

  transform(value: any[]): HeadersTable[] {
    return value as HeadersTable[];
  }

}
