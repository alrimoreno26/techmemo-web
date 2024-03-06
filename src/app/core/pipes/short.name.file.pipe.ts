import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
    transform(value: string, maxLength = 16): string | null {
        if (value.length <= maxLength) { return value; }
        if (value) {
            const shortTermLength = Math.floor((maxLength - 3) / 2);
            const oddEven = (maxLength - 3) % 2 === 0 ? 0 : 1;
            if (maxLength % 2 === 0) {
                return (
                    value.slice(0, shortTermLength + oddEven) +
                    '...' +
                    value.slice(
                        value.length - shortTermLength - (oddEven ? 0 : 1)
                    )
                );
            } else {
                return (
                    value.slice(0, shortTermLength + oddEven) +
                    '...' +
                    value.slice(value.length - shortTermLength - oddEven)
                );
            }
        }
        return null;
    }
}
