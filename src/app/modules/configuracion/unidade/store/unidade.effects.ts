import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {fromUnitActions} from "./unidade.actions";
import {UnidadeService} from "../../../../core/services/unidade.service";

@Injectable()
export class UnidadeEffects {

    loadCategoryList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUnitActions.loadUnitList),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromUnitActions.loadUnitListSuccess({data})),
                    catchError(error => of(fromUnitActions.UnitListFailRequest({error})))
                )
            )
        )
    );

    createUnit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUnitActions.createUnit),
            switchMap(({entity}) =>
                this.service.create(entity).pipe(
                    map((data) => fromUnitActions.createUnitSuccess({entity: data})),
                    catchError(error => of(fromUnitActions.UnitListFailRequest({error})))
                )
            )
        )
    );
    updateUnit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUnitActions.updateUnit),
            switchMap(({entity}) =>
                this.service.update(entity,'id').pipe(
                    map((data) => fromUnitActions.updateUnitSuccess({entity: entity})),
                    catchError(error => of(fromUnitActions.UnitListFailRequest({error})))
                )
            )
        )
    );
    deleteUnit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUnitActions.deleteUnit),
            switchMap(({id}) =>
                this.service.delete(id).pipe(
                    map(() => fromUnitActions.deleteUnitSuccess({id})),
                    catchError(error => of(fromUnitActions.UnitListFailRequest({error})))
                )
            )
        )
    );

    constructor(private actions$: Actions,
                private service: UnidadeService) {
    }
}
