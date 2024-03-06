import {Injectable, Optional} from '@angular/core';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {HeadersTable, pipe} from '../models';
import {CpfCnpjPipe} from '../../../core/pipes/cpf.cnpj.pipe';
import {CepPipe} from '../../../core/pipes/cep.pipe';
import {ShortMoneyPipe} from '../../../core/pipes/short.money.pipe';


@Injectable({
  providedIn: 'platform'
})
export class ExportDataService {
  // sourceFields: HeadersTable[];
  // targetFields: HeadersTable[] = [];
  //
  // // todo revisar el ciclo de dependencia
  // constructor(@Optional() private translateService: TranslateService,
  //             @Optional() private numberPipe: DecimalPipe,
  //             @Optional() private cpfCnpjPipe: CpfCnpjPipe,
  //             @Optional() private cepPipe: CepPipe,
  //             @Optional() private currencyPipe: CurrencyPipe,
  //             @Optional() private datePipe: DatePipe,
  //             @Optional() private cellPhonePipe: CellPhonePipe,
  //             @Optional() private shortMoneyPipe: ShortMoneyPipe) {
  // }
  //
  // transform(pipeName: pipe, data: any): string | number {
  //   switch (pipeName) {
  //     case 'deep':
  //       return data.value ? get(data.value, data.extraVal) : '-';
  //     case 'shortMoney':
  //       return this.shortMoneyPipe.transform(data.value);
  //     case 'tel':
  //       return this.cellPhonePipe.transform(data.value);
  //     case 'date':
  //       return this.datePipe.transform(data.value, 'dd-MM-YYYY') as string;
  //     case 'currency':
  //       return this.currencyPipe.transform(data.value) as string;
  //     case 'cep':
  //       return this.cepPipe.transform(data.value);
  //     case 'number':
  //       return this.numberPipe.transform(data.value) as string;
  //     case 'cpfCnpj':
  //       return this.cpfCnpjPipe.transform(data.value);
  //     case 'concat':
  //       return this.translateService.instant(data?.extraVal + data.value);
  //     case 'wrapText':
  //     default:
  //       return data.value;
  //   }
  // }
  //
  // exportExcel(listEntities: any): void {
  //   const headers: string[] = this.targetFields
  //     .map(header => this.translateService.instant(header?.header));
  //
  //   const resp = map(listEntities, (rawEntityInfo: any) => {
  //     return this.targetFields.map(h => {
  //       if (h.cFunc) {
  //         return h.cFunc(rawEntityInfo);
  //       } else if (h.pipe) {
  //         return this.transform(h.pipe, {value: get(rawEntityInfo, h.field), extraVal: h.extraVal});
  //       } else {
  //         return get(rawEntityInfo, h.field);
  //       }
  //     });
  //   });
  //
  //   const worksheet = XLSX.utils.json_to_sheet(resp);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatorio');
  //   XLSX.utils.sheet_add_aoa(worksheet, [headers], {origin: 'A1'});
  //   XLSX.writeFile(workbook, 'Relatorio.xlsx', {compression: true});
  //
  //   this.targetFields = [];
  // }
}
