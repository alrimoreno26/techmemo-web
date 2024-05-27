import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {fromSupplierListActions} from "./fornecedores.actions";
import {FornecedoresService} from "../../../../core/services/fornecedores.service";

@Injectable()
export class FornecedoresEffects {

    loadCategoryList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSupplierListActions.loadSupplierList),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromSupplierListActions.loadSupplierListSuccess({data})),
                    catchError(error => of(fromSupplierListActions.SupplierListFailRequest({error})))
                )
            )
        )
    );

    autocompleteSupplierList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSupplierListActions.autocompleteSupplierList),
            switchMap(({lazy}) =>
                this.service.autocompleteSuplpiers(lazy).pipe(
                    map((data) => fromSupplierListActions.autocompleteSupplierListSuccess({data})),
                    catchError(error => of(fromSupplierListActions.SupplierListFailRequest({error})))
                )
            )
        )
    );

    createSupplier$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSupplierListActions.createSupplier),
            switchMap(({entity}) =>
                this.service.create(entity).pipe(
                    map((data) => fromSupplierListActions.createSupplierSuccess({entity: data})),
                    catchError(error => of(fromSupplierListActions.SupplierListFailRequest({error})))
                )
            )
        )
    );
    updateSupplier$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSupplierListActions.updateSupplier),
            switchMap(({entity}) =>
                this.service.update(entity,'id').pipe(
                    map((data) => fromSupplierListActions.updateSupplierSuccess({entity: entity})),
                    catchError(error => of(fromSupplierListActions.SupplierListFailRequest({error})))
                )
            )
        )
    );
    deleteSupplier$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSupplierListActions.deleteSupplier),
            switchMap(({id}) =>
                this.service.delete(id).pipe(
                    map(() => fromSupplierListActions.deleteSupplierSuccess({id})),
                    catchError(error => of(fromSupplierListActions.SupplierListFailRequest({error})))
                )
            )
        )
    );

    getById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSupplierListActions.getByID),
            switchMap(({id}) =>
                this.service.findOneById(id).pipe(
                    map((data) => fromSupplierListActions.getByIDSuccess({entity: data})),
                    catchError(error => of(fromSupplierListActions.SupplierListFailRequest({error})))
                )
            )
        )
    );

    constructor(private actions$: Actions,
                private service: FornecedoresService) {
    }
}
