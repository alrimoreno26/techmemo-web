import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {forkJoin, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {fromUserActions} from './user.actions';
import {UserAdminServices} from '../../../../core/services/user.admin.services';
import {RoleServices} from "../../../../core/services/role.services";
import {CompanyAdminServices} from "../../../../core/services/company.admin.services";

@Injectable()
export class UserEffects {
  loadResolver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadResolver),
      switchMap(({lazy}) =>
        forkJoin([
          this.userAdminServices.findAllPaginate(lazy),
          this.roleService.findAllPaginate({page: 0, count: 50}),
        ]).pipe(
          map(([data, role]) => fromUserActions.loadResolverSuccess({data, role})),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadUser),
      switchMap(({lazy}) =>
        this.userAdminServices.findAllPaginate(lazy).pipe(
          map((data) => fromUserActions.loadUserSuccess({data})),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.createUser),
      switchMap(({entity}) =>
        this.userAdminServices.create(entity).pipe(
          map((data) => fromUserActions.createUserSuccess({entity: data})),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.updateUser),
      switchMap(({entity}) =>
        this.userAdminServices.update(entity, 'id',{}).pipe(
          map((data) => fromUserActions.updateUserSuccess({entity: data})),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.deleteUser),
      switchMap(({id}) =>
        this.userAdminServices.delete(id).pipe(
          map(() => fromUserActions.deleteUserSuccess({id})),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );
  enableOrDisableUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.enableOrDisableUser),
      switchMap(({id}) =>
        this.userAdminServices.enableOrDisable(id).pipe(
          map((data) => fromUserActions.enableOrDisableUserSuccess({entity: data})),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );
  resetRatingUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.resetRatingUsers),
      switchMap(() =>
        this.userAdminServices.resetRating().pipe(
          map(() => fromUserActions.resetRatingUsersSuccess()),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );
  generatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.generatePassword),
      switchMap(({data}) =>
        this.userAdminServices.generatePassword(data).pipe(
          map(() => fromUserActions.generatePasswordSuccess()),
          catchError(error => of(fromUserActions.userFailRequest({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userAdminServices: UserAdminServices,
    private roleService: RoleServices,
    private companyAdminServices: CompanyAdminServices
  ) {
  }
}
