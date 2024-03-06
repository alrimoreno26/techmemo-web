import {Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ConfirmServices {
  constructor(private confirmationService: ConfirmationService) {
  }

  confirm(header: string = 'common.confirmation',
          message: string = 'common.textConfirmDelete',
          acceptLabel: string = 'common.yes',
          rejectLabel: string = 'common.cancel',
          icon: string = 'mdi mdi-alert-outline'): Observable<boolean> {
    return new Observable(observer => {
      this.confirmationService.confirm({
        header,
        message,
        acceptLabel,
        rejectLabel,
        icon,
        acceptIcon: 'mdi mdi-check',
        rejectIcon: 'mdi mdi-close',
        rejectButtonStyleClass: 'p-button-outlined',
        accept: () => observer.next(true),
        reject: () => observer.next(false)
      });
    });
  }

  deleteConfirm(): Observable<boolean> {
    return new Observable(observer => {
      this.confirmationService.confirm({
        header: 'common.confirmation',
        message: 'common.textConfirmDelete',
        acceptLabel: 'common.yes',
        rejectLabel: 'common.cancel',
        icon: 'mdi mdi-alert-outline',
        acceptIcon: 'mdi mdi-check',
        rejectIcon: 'mdi mdi-close',
        rejectButtonStyleClass: 'p-button-outlined',
        accept: () => observer.next(true),
        reject: () => observer.next(false)
      });
    });
  }

}
