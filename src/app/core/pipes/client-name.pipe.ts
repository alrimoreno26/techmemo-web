import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'clientName'
})
export class ClientNamePipe implements PipeTransform {

    /**
     * Transform name client or table in string
     * @param value string or number
     * @param mesa string or number
     */
    transform(value: any, mesa: number): string {
        return value ? 'Order do: ' + value : 'Mesa: ' + mesa;
    }
}
