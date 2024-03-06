import {AfterViewInit, Directive, inject, Injector, OnDestroy, QueryList, Signal, Type, ViewChildren} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {filter, switchMap} from 'rxjs/operators';
import {isObservable, Observable, Subject, tap} from 'rxjs';
import {DataTableComponent} from '../data-table.component';
import {HeadersTable} from '../models';
import {ExportDataService} from '../services/export.data.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {MessageServices} from '../../../core/injects/message.services';


@Directive({
  selector: 'p-base-cmp'
})
export class BaseComponentDirective implements AfterViewInit, OnDestroy {
  /**
   * View Child of Data Table component
   */
  @ViewChildren(DataTableComponent) datatable: QueryList<DataTableComponent>;
  /**
   * Inject the DialogService
   */
  dialogService: DialogService = inject(DialogService);
  /**
   * Inject the ExportDataService
   */
  exportDataService: ExportDataService = inject(ExportDataService);
  /**
   * Inject the Message Service
   */
  messageService: MessageServices = inject(MessageServices);
  /**
   * Keep reference of dialog for use inside of component
   */
  dialog: DynamicDialogRef;
  /**
   * Reference of Modal
   */
  modalContent: Type<any>;
  /**
   * Array of {@link HeadersTable} elements used in datatable
   */
  headersTable: HeadersTable[];
  /**
   * Keep the signal data or observable request
   */
  request: Signal<any> | Observable<any>;
  /**
   * Keep the drag element
   */
  drag: any | null;
  /**
   * State of drop event.
   */
  drop: boolean;
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

  ngAfterViewInit(): void {
    this.datatable.map((table: DataTableComponent): void => {
      table.create.subscribe(() => this.showModal());
      table.edit.subscribe(data => this.showModal({data}));
      table.export.subscribe(request => {
        this.request = request;
        // this.exportData();
      });
    });
  }

  /**
   * Show modal width default config
   * @param config dynamic object
   */
  showModal(config: object = {}): void {
    this.dialog = this.dialogService.open(this.modalContent, config);
  }

}
