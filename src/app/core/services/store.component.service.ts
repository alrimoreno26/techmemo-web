import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {concatMap, Observable, switchMap} from 'rxjs';
import {Signal} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {AbstractService} from "./abstract.services";
import {LazyLoadData} from "../../standalone/data-table/models";

export interface EntityState<T> {
    entities: Array<T>;
    total: number;
    loaded: boolean;
    dialog: boolean;
    selected?: T | any;
    error?: Error | any;
}

export function isUpdateStore(obj: any, stateProps: string[]): any {
    if (Object.hasOwn(obj, 'data') && Object.hasOwn(obj, 'updateStore')) {
        const args: any = {};
        stateProps.filter(f => f !== 'entities' && f !== 'total').forEach(p => {
            if (Object.hasOwn(obj, p)) {
                args[p] = obj[p];
            }
        });
        return {data: obj.data, ...args};
    }
    return {data: obj, dialog: false};
}

export class StoreComponentService<T> extends ComponentStore<EntityState<T> | any> {

    /**
     * Server side pagination and filter default value false
     */
    serverSide: boolean;
    /**
     * Server side pagination start on Init default value true
     */
    lazyLoadOnInit = true;
    /**
     * Keep the reference for pagination in lazy mode default value 0
     */
    pageRecord = 0;
    /**
     * Keep the reference for pagination number of row per page in lazy mode default value 25
     */
    pageSize = 25;
    /**
     * Length value from list of Entities
     * the observable is for used in store ngrx and the plain value is always updated
     */
    readonly listEntities$: Signal<T[]> = this.selectSignal(state => state.entities);
    /**
     * Length value from list of Entities
     * the observable is for used in store ngrx and the plain value is always updated
     */
    readonly total$: Signal<number> = this.selectSignal(state => state.total);
    /**
     * The dialog visibility
     * the observable is for used in store ngrx and the plain value is always updated
     */
    readonly dialog$: Signal<boolean> = this.selectSignal(state => state.dialog);
    /**
     * Show when the request is executing
     * the observable is for used in store ngrx and the plain value is always updated
     */
    readonly loaded$: Signal<boolean> = this.selectSignal(state => state.loaded);
    /**
     * Selected Entity type T
     * the observable is for used in store ngrx and the plain value is always updated
     */
    readonly selectedEntity$: Signal<T | any> = this.selectSignal(state => state.selected);
    hasUpdatePath = true;
    dataKey = 'id';
    readonly setAll = this.updater((state, entities: T[]) => ({
        ...state,
        entities,
        total: entities.length,
        loaded: true
    }));
    readonly setAdd = this.updater((state, create: T | any) => {
        const {data, ...args} = isUpdateStore(create, Object.keys(this.state()));
        return {
            ...state,
            entities: [...state.entities, data],
            total: state.total + 1,
            ...args
        };
    });
    readonly setUpdate = this.updater((state, update: T | any) => {
        const {data, ...args} = isUpdateStore(update, Object.keys(this.state()));
        return {
            ...state,
            entities: state.entities.map((m: {
                [x: string]: any;
            }) => m[this.dataKey] === data[this.dataKey] ? {...m, ...data} : m),
            selected: state.selected ? {...state.selected, ...data} : state.selected,
            ...args
        };
    });
    readonly setDelete = this.updater((state, id: string | number) => ({
        ...state,
        entities: state.entities.filter((f: { [x: string]: string | number; }) => f[this.dataKey] !== id),
        total: state.total - 1
    }));
    readonly setSelectById = this.updater((state, id: string | number) => ({
        ...state,
        selected: state.entities.find((f: T | any) => f[this.dataKey] === id)
    }));
    /**
     * Reference of dialog
     * @private dialogRef {@link DynamicDialogRef}
     */
    protected dialogRef: DynamicDialogRef;

    constructor(private service: AbstractService<T | any>,
                defaultState: EntityState<T>) {
        super(defaultState);
    }

    loadAll = this.effect<any>((lazy$: Observable<{ lazy?: LazyLoadData | Partial<LazyLoadData> }>) => lazy$.pipe(
        switchMap(({lazy}) => {
            return lazy ?
                this.service.findAllPaginate(lazy as LazyLoadData).pipe(
                    tapResponse({
                        next: (result) => {
                            const {content, page} = result;
                            this.setAll(content);
                            this.patchState({total: page.totalElements});
                        },
                        error: (err: HttpErrorResponse) => this.setError(err.error),
                        finalize: () => this.finalizeLoad()
                    })
                ) :
                this.service.findAll().pipe(
                    tapResponse({
                        next: (list) => this.setAll(list),
                        error: (err: HttpErrorResponse) => this.setError(err.error),
                        finalize: () => this.finalizeLoad()
                    })
                );
        })
    ));
    create = this.effect((create$: Observable<{ data: T | any }>) => create$.pipe(
        concatMap(({data}) => this.service.create(data).pipe(
            tapResponse({
                next: (response) => this.preAdd(response, data),
                error: (err: HttpErrorResponse) => this.preAddError(data, err.error),
                finalize: () => this.finalizeAdd()
            }))
        )
    ));
    update = this.effect((update$: Observable<{ data: T | any }>) => update$.pipe(
        concatMap(({data}) => this.service.update(data, (this.hasUpdatePath ? this.dataKey : undefined)).pipe(
            tapResponse({
                next: (response) => this.preUpdate(response, data),
                error: (err: HttpErrorResponse) => this.setError(err.error),
                finalize: () => this.finalizeUpdate()
            }))
        )
    ));
    delete = this.effect((delete$: Observable<{ id: string | number }>) => delete$.pipe(
        concatMap(({id}) => this.service.delete(id).pipe(
            tapResponse({
                next: () => this.setDelete(id),
                error: (err: HttpErrorResponse) => this.setError(err.error),
                finalize: () => this.finalizeDelete()
            }))
        )
    ));
    setError = (error: HttpErrorResponse): void => this.patchState({error});
    openModalAddOrEdit = (dialog: boolean = true): void => this.patchState({dialog});
    setSelected = (selected: T): void => this.patchState({selected});

    preAdd = (response: any, request: any) => this.setAdd(response);
    preAddError = (data: any, error: HttpErrorResponse) => this.setError(error.error);
    preUpdate = (response: any, request: any) => this.setUpdate(response);
    finalizeLoad = () => {
    };
    finalizeAdd = () => {
    };
    finalizeUpdate = () => {
    };
    finalizeDelete = () => {
    };

    getLoaded = () => this.selectSignal((state) => state.loaded)();
    getDialog = () => this.selectSignal((state) => state.dialog)();
    getSelectById$ = (id: string | number): Observable<T> => this.select((state) => state.entities.find((f: T | any) => f[this.dataKey] === id));
    getSelectById = (id: string | number): Signal<T> => this.selectSignal((state) => state.entities.find((f: T | any) => f[this.dataKey] === id));
    loadAllForExport = (): Signal<T[]> | Observable<T[]> => this.listEntities$;
}
