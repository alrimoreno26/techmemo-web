import { Pipe, PipeTransform } from '@angular/core';
import {HeadersTable} from "../../standalone/data-table/models";

@Pipe({
  name: 'extraHeader'
})
export class ExtraHeaderPipe implements PipeTransform {

  transform(value: HeadersTable[]): any[] {
    return value;
  }

}
