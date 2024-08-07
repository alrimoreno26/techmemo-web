import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'clientName'
})
export class ClientNamePipe implements PipeTransform {

    /**
     * Transform name client or table in string
     * @param value string or number
     */
    transform(value: any): string {
        if (value.clientName !== "") {
            return 'Order do ' + value.clientName;
        } else if (value.clientDocument !== "") {
            return 'Order do ' + value.clientDocument;
        } else if (value.tableNumber !== null) {
            return "Mesa: " + value.tableNumber;
        }
        return "Pedido #" + value.code;
    }
}
