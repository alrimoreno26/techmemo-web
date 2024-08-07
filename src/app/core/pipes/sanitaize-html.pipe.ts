import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {}

    transform(value: any): SafeHtml {
        const text = (typeof value === 'object' ? value.value : value) || '';
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }

}
