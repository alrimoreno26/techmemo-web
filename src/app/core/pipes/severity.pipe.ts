import {Pipe, PipeTransform} from '@angular/core';
import {productType} from "../enums/product";

@Pipe({
    name: 'severity'
})
export class SeverityPipe implements PipeTransform {

    /**
     * Returno color of severity badge
     * @param value string
     * @return An 'success' | 'warning' | 'danger' | 'info'
     */
    transform(value: string): 'success' | 'warning' | 'danger' | 'info' {
        switch (value) {
            case productType.SIMPLE:
            case 'PAID':
            case 'FINISHED':
            case 'POS':
            case 'BILLINGS':
                return 'success';
            case productType.COMBO:
            case 'IN_PAYMENT':
            case 'KITCHEN':
            case 'ACTIVE':
            case 'TYPING':
                return 'warning';
            case 'CLOSED':
            case 'CANCELLED':
            case 'UNPAID':
            case 'EXPENSES':
                return 'danger';
            default:
                return 'info';
        }
    }
}
