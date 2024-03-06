import {Directive, effect, EffectRef, inject, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BaseStoreServices} from '../class/base.store.services';
import {Subject} from 'rxjs';

@Directive({
  selector: 'm-base-modal-cmp'
})
export class BaseModalComponentDirective implements OnDestroy {
  /**
   * Inject the DynamicDialogRef
   */
  ref: DynamicDialogRef = inject(DynamicDialogRef);
  /**
   * Inject the DynamicDialogConfig
   */
  config: DynamicDialogConfig<any> = inject(DynamicDialogConfig);
  /**
   * The Effect to control the show and hide dialog
   */
  checkRef: EffectRef = effect(() => {
    if (!this.service.dialog$()) {
      this.ref.close('Close');
    }
  });
  /**
   * Form group base for modal
   */
  form: FormGroup;
  protected ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(public service: BaseStoreServices<any>) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  /**
   * Save or Update method
   */
  save(): void {
    !this.config.data ?
      this.service.create(this.form.value) :
      this.service.update({id: this.config.data.id, ...this.form.value});
  }
}
