import {Injectable} from '@angular/core';
import {forkJoin, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {fromRoleActions} from './role.actions';
import {RoleServices} from 'src/app/core/services/role.services';

@Injectable()
export class RoleEffects {

    loadRole$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRoleActions.loadRole),
            switchMap(() =>
                forkJoin([
                    this.service.findAll(),
                    this.service.getAllAuthority({pageNumber:0, pageSize: 1000})
                ]).pipe(
                    map((data: any) => {
                        return fromRoleActions.loadRoleSuccess({data: {roleList: data[0].content, authorityList: data[1].content}});
                    }),
                    catchError(error => of(fromRoleActions.roleFailRequest({error})))
                )
            )
        )
    );
    createRole$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRoleActions.createRole),
            switchMap(({entity}) =>
                this.service.create(entity).pipe(
                    map((data) => fromRoleActions.createRoleSuccess({entity: data})),
                    catchError(error => of(fromRoleActions.roleFailRequest({error})))
                )
            )
        )
    );
    updateRole$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRoleActions.updateRole),
            switchMap(({entity}) =>
                this.service.update(entity).pipe(
                    map((data) => fromRoleActions.updateRoleSuccess({entity: data})),
                    catchError(error => of(fromRoleActions.roleFailRequest({error})))
                )
            )
        )
    );
    deleteRole$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRoleActions.deleteRole),
            switchMap(({id}) =>
                this.service.delete(id).pipe(
                    map(() => fromRoleActions.deleteRoleSuccess({id})),
                    catchError(error => of(fromRoleActions.roleFailRequest({error})))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private service: RoleServices
    ) {
    }
}
