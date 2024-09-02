import {
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Table, TableLazyLoadEvent, TableRowReorderEvent} from 'primeng/table';
import {BaseStoreServices} from './class/base.store.services';
import {HeadersTable, RowReorder} from './models';
import {TableRowDirective} from './directives/table-row.directive';
import {TableExpansionDirective} from './directives/table-expansion.directive';
import {Menu} from 'primeng/menu';
import {StoreComponentService} from './store/store.component.service';
import {ConfirmServices} from '../../core/injects/confirm.services';
import {confirmDialog} from '../../core/rx/confirm';
import {Subject, takeUntil} from 'rxjs';
import {TableFooterDirective} from './directives/table-footer.directive';
import {productType} from "../../core/enums/product";


@Component({
    selector: 'c-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
    /**
     * Element ref to track in data table
     */
    @Input() dataKey = 'id';
    /**
     * Set custom css class to de table
     */
    @Input() class = '';
    /**
     * Set mode row drag and drop in the table default is false
     */
    @Input() rowDragAndDrop = false;
    /**
     * Set mode row expansion in the table default is false
     */
    @Input() rowExpansion = false;
    /**
     * Set mode row Footer in the table default is false
     */
    @Input() rowFooter = false;
    /**
     * For enable pagination table default value true
     */
    @Input() pagination = true;
    /**
     * Array the values for the pagination default value 25, 50, 100
     */
    @Input() rowsPerPageOptions: number[] = [10, 25, 50, 100];
    /**
     * The available table Headers
     */
    @Input() headers: HeadersTable[] = [];
    /**
     * Service inject data from store
     */
    @Input() service: BaseStoreServices<any> | StoreComponentService<any>;
    /**
     * List of items inside of Button Split type {@link MenuItem}
     */
    @Input() itemsSplit: MenuItem[] = [];
    /**
     * Action column default true
     */
    @Input() action = true;
    /**
     * Show Create Button Action
     */
    @Input() showCreate = true;
    /**
     * Icon for create Button
     */
    @Input() iconCreate = 'mdi-plus';
    /**
     * Show Edit Button Action
     */
    @Input() showEdit = true;
    /**
     * Icon for edit Button
     */
    @Input() iconEdit = 'mdi-pencil';
    /**
     * Show Delete Button Action
     */
    @Input() showDelete = true;
    /**
     * Icon for delete Button
     */
    @Input() iconDelete = 'mdi-trash-can-outline';
    /**
     * List of source items optional use service
     */
    @Input() items: any[];
    /**
     * Custom type for loadAll
     */
    @Input() type: string;
    /**
     * Refresh button
     */
    @Input() refreshBtn = true;
    /**
     * Toggle export button
     */
    @Input() exportBtn = true;
    /**
     * EventEmitter for create Action launch the modal
     */
    @Output() create: EventEmitter<void> = new EventEmitter<void>();
    /**
     * EventEmitter for edit Action launch the modal width current value of row item
     */
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();
    /**
     * EventEmitter for Export Action. launch the export feature
     */
    @Output() export: EventEmitter<any> = new EventEmitter<any>();
    /**
     * EventEmitter for delete Action confirm action before emit the event
     */
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();
    /**
     * EventEmitter for row drag and drop action event
     */
    @Output() onRowReorder: EventEmitter<RowReorder> = new EventEmitter<RowReorder>();
    /**
     * Input for control search state
     */
    @ViewChild('inputSearch', {static: false}) input: ElementRef;
    @ViewChild('menu', {static: false}) menu: Menu;
    /**
     * List of templates inside of table
     */
    @ContentChild(TableExpansionDirective) expansionRow!: TableExpansionDirective;
    @ContentChild(TableFooterDirective) footerRow!: TableFooterDirective;
    @ContentChildren(TableRowDirective) contentChildren!: QueryList<TableRowDirective>;
    /**
     * Contains the search value
     */
    search: string;
    /**
     * Content all extra action in menu overflow for keep more clean the table
     */
    contextAction: MenuItem[] | undefined;
    /**
     * Set custom names to tooltips to the actions in table
     */
    name = '';
    /**
     * Keep all subscription of NgRx
     * @protected ngUnsubscribe Subject boolean
     */

    selectedType: any | undefined;
    protected ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

    constructor(private routing: ActivatedRoute,
                private confirmationService: ConfirmServices) {
    }

    ngOnInit(): void {
        this.headers = this.headers.filter(header => header.visible);
        if (this.action && this.headers.length) {
            const {context}: HeadersTable = this.headers[this.headers.length - 1];
            this.contextAction = context ?? undefined;
        }
        /**
         * Extract metadata from routing
         */
        this.routing.data.subscribe((r: any) => this.name = r?.name);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

    /**
     * It's for lazy load of data, filters and sort elements direct in API server
     * @param $event {@link TableLazyLoadEvent}
     */
    loadCustomLazy($event: TableLazyLoadEvent): void {
        const {first, rows, globalFilter, sortField, sortOrder} = $event;
        if ($event?.filters) {
            // @ts-ignore
            let value = Object.keys($event.filters).length > 0 ? $event?.filters?.type[0]?.value : globalFilter;
            this.service.loadAll({
                pageNumber: first as number / (rows as number),
                pageSize: rows ? rows : 25,
                filter: globalFilter ? globalFilter as string : '',
                type: value ? value : this.type,
                sort: sortField as string,
                direction: sortField ? sortOrder === 1 ? 'ASC' : 'DESC' : sortField,
                first
            });
        } else {
            this.service.loadAll({
                pageNumber: first as number / (rows as number),
                pageSize: rows ? rows : 25,
                filter: globalFilter ? globalFilter as string : '',
                sort: sortField as string,
                type: this.type,
                direction: sortField ? sortOrder === 1 ? 'ASC' : 'DESC' : sortField,
                first
            });
        }

    }

    /**
     * Make the global filter over data elements
     * @param event Event
     * @param dt {@link Table}
     */
    setGlobalFilter(event: { target: { value: string; } } | any, dt: Table): void {
        const {value} = event.target;
        this.search = event.target.value;
        dt.filterGlobal(value, 'contains');
    }

    /**
     * Set the selected item in the store for future work
     * @param event Event
     * @param data any
     */
    setSelectedRow(event: any, data: any): void {
        this.menu.toggle(event);
        this.service.setSelected(data);
    }

    /**
     * Emit the create event and set dialog in true
     */
    createItem(): void {
        if (this.service && this.showCreate) {
            this.service.openModalAddOrEdit();
        }
        this.create.emit();
    }

    /**
     * Emit the edit event and set dialog in true
     * @param item any
     */
    editItem(item: any): void {
        if (this.service && this.showEdit) {
            this.service.openModalAddOrEdit();
        }
        this.edit.emit(item);
    }

    /**
     * Confirm the action of delete before emit the event
     * @param item any
     */
    deleteItem(item: any): void {
        this.confirmationService.deleteConfirm().pipe(
            takeUntil(this.ngUnsubscribe),
            confirmDialog(
                () => {
                    this.delete.emit(item);
                    if (this.service) {
                        if (this.service instanceof BaseStoreServices) {
                            this.service.delete(item[this.dataKey]);
                        } else {
                            this.service.delete({id: item[this.dataKey]});
                        }
                    }
                }
            )
        ).subscribe();
    }

    /**
     * Method recharges the data of the table
     */
    refreshContentData(dt: Table): void {
        this.service.serverSide ?
            this.service.loadAll({pageNumber: 0, pageSize: dt.rows, type: this.type}) :
            this.service.loadAll(undefined);
        this.input.nativeElement.value = '';
        dt.filters = {};
    }

    /**
     * Emit event drag and drop for row table
     * @param event TableRowReorderEvent
     * @param dt {@link Table}
     */
    rowReorder(event: TableRowReorderEvent, dt: Table): void {
        this.onRowReorder.emit({...event, item: dt.value[event.dropIndex as number]});
    }

    /**
     * Trigger the export feature
     */
    showPrintModal(): void {
        this.export.emit(this.service.loadAllForExport());
    }

    protected readonly productType = productType;
}
