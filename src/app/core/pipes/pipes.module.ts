import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CepPipe} from './cep.pipe';
import {CnpjPipe} from './cnpj.pipe';
import {DeepPipe} from './deep.pipe';
import {CpfCnpjPipe} from './cpf.cnpj.pipe';
import {WrapTextPipe} from './wrap.text.pipe';
import {AccountantPipe} from './accountant.pipe';
import {AsyncTablePipe} from './async-table.pipe';
import {ShortMoneyPipe} from './short.money.pipe';
import {AsyncStringPipe} from './async-string.pipe';
import {AsyncNumberPipe} from './async-number.pipe';
import {AsyncBooleanPipe} from './async-boolean.pipe';
import {CellPhonePipe} from "./cell-phone.pipe";
import {SanitizeHtmlPipe} from "./sanitaize-html.pipe";
import {SeverityPipe} from "./severity.pipe";
import {ClientNamePipe} from "./client-name.pipe";


@NgModule({
    declarations: [
        CepPipe,
        CnpjPipe,
        DeepPipe,
        CpfCnpjPipe,
        WrapTextPipe,
        AccountantPipe,
        AsyncTablePipe,
        ShortMoneyPipe,
        AsyncStringPipe,
        AsyncNumberPipe,
        AsyncBooleanPipe,
        CellPhonePipe,
        SanitizeHtmlPipe,
        ClientNamePipe,
        SeverityPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CepPipe,
        CnpjPipe,
        DeepPipe,
        CpfCnpjPipe,
        WrapTextPipe,
        AccountantPipe,
        AsyncTablePipe,
        ShortMoneyPipe,
        AsyncStringPipe,
        AsyncNumberPipe,
        AsyncBooleanPipe,
        CellPhonePipe,
        SanitizeHtmlPipe,
        ClientNamePipe,
        SeverityPipe
    ],
    providers: [
        CepPipe,
        CpfCnpjPipe,
        ShortMoneyPipe
    ]
})
export class PipesModule {
}
