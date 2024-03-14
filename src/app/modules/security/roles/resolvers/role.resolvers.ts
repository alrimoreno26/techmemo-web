import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {filter, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {fromRoleActions} from '../store/role.actions';
import {RolePartialState} from '../store/role.reducers';
import {selectEntityLoaded} from '../store/role.selectors';

export const roleResolver: ResolveFn<boolean> = () => {
  const store = inject(Store<RolePartialState>);
  const loaded$ = store.select(selectEntityLoaded);

  return loaded$.pipe(
    filter(loaded => {
      if (!loaded) {
        store.dispatch(fromRoleActions.loadRole());
      }
      return loaded;
    }),
    take(1)
  );
};
