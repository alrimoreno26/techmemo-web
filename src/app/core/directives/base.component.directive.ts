import {Directive, inject, Injector, OnDestroy, Type} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subject,} from 'rxjs';
import {MessageServices} from "../injects/message.services";


@Directive({
  selector: 'p-base-cmp'
})
export class BaseComponentDirective implements OnDestroy {

  /**
   * Inject the DialogService
   */
  dialogService: DialogService = inject(DialogService);
  /**
   * Inject the Message Service
   */
  messageService: MessageServices = inject(MessageServices);
  /**
   * Keep reference of dialog for use inside of modals
   */
  dialog: DynamicDialogRef;
  /**
   * Reference of Modal
   */
  modalContent: Type<any>;
  /**
   * Inject the Injector for the signal return in switchMap
   * @private
   */
  private injector: Injector = inject(Injector);
  /**
   * Keep all subscription of NgRx
   * @protected ngUnsubscribe Subject boolean
   */
  protected ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  /**
   * Show modal width default config
   * @param config dynamic object
   */
  showModal(config: object = {}): void {
    this.dialog = this.dialogService.open(this.modalContent, config);
  }
}
