import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {fromNotifyActions, weightScale} from './notify.actions';

@Injectable()
export class NotifyEffects {
  // loadNotify$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromNotifyActions.loadNotify),
  //     switchMap(({lazy}) =>
  //       this.service.findAllPaginate(lazy).pipe(
  //         map((data) => fromNotifyActions.loadNotifySuccess({data})),
  //         catchError(error => of(fromNotifyActions.notifyFailRequest({error})))
  //       )
  //     )
  //   )
  // );
  // updateNotify$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromNotifyActions.updateNotify),
  //     switchMap(({entity}) =>
  //       this.service.markAsRead(entity).pipe(
  //         map(() => fromNotifyActions.updateNotifySuccess({entity})),
  //         catchError(error => of(fromNotifyActions.notifyFailRequest({error})))
  //       )
  //     )
  //   )
  // );
  // deleteNotify$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromNotifyActions.deleteNotify),
  //     switchMap(({id}) =>
  //       this.service.delete(id).pipe(
  //         map(() => fromNotifyActions.deleteNotifySuccess({id})),
  //         catchError(error => of(fromNotifyActions.notifyFailRequest({error})))
  //       )
  //     )
  //   )
  // );
  // markAsReadAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromNotifyActions.markAsReadAll),
  //     switchMap(() =>
  //       this.service.markAsReadAll().pipe(
  //         map(() => fromNotifyActions.markAsReadAllSuccess()),
  //         catchError(error => of(fromNotifyActions.notifyFailRequest({error})))
  //       )
  //     )
  //   )
  // );
  // deleteAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromNotifyActions.deleteAll),
  //     switchMap(() =>
  //       this.service.deleteAll().pipe(
  //         map(() => fromNotifyActions.deleteAllSuccess()),
  //         catchError(error => of(fromNotifyActions.notifyFailRequest({error})))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions
  ) {
  }
}
