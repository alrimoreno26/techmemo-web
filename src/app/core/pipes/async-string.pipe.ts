import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asyncString'
})
export class AsyncStringPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    return value ? value.toString() : '';
  }
}
