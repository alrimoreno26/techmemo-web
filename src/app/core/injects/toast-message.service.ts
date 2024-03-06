import { MessageService } from 'primeng/api';
import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {getErrorMessage} from "../util";

type Severity = 'success'|'info'|'warn'|'error';

@Injectable({
    providedIn: 'root',
})
export class ToastMessageService implements OnDestroy {

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService
  ) {

  }

  handleError(
    error: any,
    fallbackMessage?: string,
    title = this.translateService.instant('app.generic_error_text_title'),
    life = 30000
  ): void {
    this.messageService.add({ severity: 'error', summary: title, life , detail: getErrorMessage(error, fallbackMessage) });
  }

  showMessage(type: Severity, title: string, message: string, life = 10000): void{
    this.messageService.add({ severity: type, summary: title, life, detail: message });
  }

  clear(): void {
    this.messageService.clear();
  }

  ngOnDestroy(): void {
    this.clear();
  }
}
