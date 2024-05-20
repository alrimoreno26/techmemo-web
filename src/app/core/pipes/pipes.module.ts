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
import {TimeAgoPipe} from "./time-ago.pipe";
import {ColHeaderPipe} from "../../standalone/data-table/pipes/col-header.pipe";
import {ColSpanPipe} from "../../standalone/data-table/pipes/col-span.pipe";
import {LeafCheckPipe} from "./leaf-check.pipe";
import {ExtraHeaderPipe} from "./extra-header.pipe";
import {NumberKPipe} from "./number-decimal.pipe";


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
        SeverityPipe,
        TimeAgoPipe,
        ColHeaderPipe,
        ColSpanPipe,
        LeafCheckPipe,
        ExtraHeaderPipe,
        NumberKPipe
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
        SeverityPipe,
        TimeAgoPipe,
        ColHeaderPipe,
        ColSpanPipe,
        LeafCheckPipe,
        ExtraHeaderPipe,
        NumberKPipe
    ],
    providers: [
        CepPipe,
        CpfCnpjPipe,
        ShortMoneyPipe
    ]
})
export class PipesModule {
}
