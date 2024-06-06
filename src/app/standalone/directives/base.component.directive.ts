// import {AfterViewInit, Directive, inject, Injector, OnDestroy, QueryList, Signal, Type, ViewChildren} from '@angular/core';
// import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
// import {filter, switchMap} from 'rxjs/operators';
// import {isObservable, Observable, Subject, tap} from 'rxjs';
// import {DataTableComponent} from '../data-table.modals';
// import {HeadersTable} from '../models';
// import {ExportDataService} from '../services/export.data.service';
// import {ExportDataModalComponent} from '../components/export-data-modal/export-data-modal.modals';
// import {toObservable} from '@angular/core/rxjs-interop';
// import {DragValidation, DropValidation} from '../../../core/models';
// import {MessageServices} from '../../../core/injects/message.services';
//
//
// @Directive({
//   selector: 'p-base-cmp'
// })
// export class BaseComponentDirective implements AfterViewInit, OnDestroy {
//   /**
//    * View Child of Data Table modals
//    */
//   @ViewChildren(DataTableComponent) datatable: QueryList<DataTableComponent>;
//   /**
//    * Inject the DialogService
//    */
//   dialogService: DialogService = inject(DialogService);
//   /**
//    * Inject the ExportDataService
//    */
//   exportDataService: ExportDataService = inject(ExportDataService);
//   /**
//    * Inject the Message Service
//    */
//   messageService: MessageServices = inject(MessageServices);
//   /**
//    * Keep reference of dialog for use inside of modals
//    */
//   dialog: DynamicDialogRef;
//   /**
//    * Reference of Modal
//    */
//   modalContent: Type<any>;
//   /**
//    * Array of {@link HeadersTable} elements used in datatable
//    */
//   headersTable: HeadersTable[];
//   /**
//    * Keep the signal data or observable request
//    */
//   request: Signal<any> | Observable<any>;
//   /**
//    * Keep the drag element
//    */
//   drag: any | null;
//   /**
//    * State of drop event.
//    */
//   drop: boolean;
//   /**
//    * Inject the Injector for the signal return in switchMap
//    * @private
//    */
//   private injector: Injector = inject(Injector);
//   /**
//    * Keep all subscription of NgRx
//    * @protected ngUnsubscribe Subject boolean
//    */
//   protected ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
//
//   ngOnDestroy(): void {
//     this.ngUnsubscribe.next(true);
//     this.ngUnsubscribe.complete();
//   }
//
//   ngAfterViewInit(): void {
//     this.datatable.map((table: DataTableComponent): void => {
//       table.create.subscribe(() => this.showModal());
//       table.edit.subscribe(data => this.showModal({data}));
//       table.export.subscribe(request => {
//         this.request = request;
//         this.exportData();
//       });
//     });
//   }
//
//   /**
//    * Show modal width default config
//    * @param config dynamic object
//    */
//   showModal(config: object = {}): void {
//     this.dialog = this.dialogService.open(this.modalContent, config);
//   }
//
//   exportData(): void {
//     this.exportDataService.sourceFields = this.headersTable.filter(header => header?.export);
//     const ref = this.dialogService.open(ExportDataModalComponent, {});
//     ref.onClose.pipe(
//       filter(data => {
//         if (!data) {
//           this.exportDataService.targetFields = [];
//         }
//         return data;
//       }),
//       switchMap(() => {
//         if (isObservable(this.request)) {
//           return this.request;
//         }
//         return toObservable(this.request as Signal<any>, {injector: this.injector});
//       }),
//       tap((list) => this.exportDataService.exportExcel(list))
//     ).subscribe();
//   }
//
//   /**
//    *  For custom validation of Drag Start Event
//    * @param ev
//    */
//   dragStartValidation(ev: DragValidation<any> | null): void {
//     if (ev) {
//       const {event, data} = ev;
//       this.drag = data;
//     }
//   }
//
//   /**
//    *  For custom validation of Drop Event
//    * @param ev
//    */
//   dropEndValidation(ev: DropValidation<any> | null): void {
//     if (ev) {
//       const {event, data} = ev;
//       this.drop = data.drop;
//       if (!this.drop) {
//         if (data.errorMsg) {
//           this.messageService.addError(data.errorMsg);
//         }
//         event.preventDefault();
//         event.stopPropagation();
//       }
//     } else {
//       this.drop = false;
//     }
//   }
// }
