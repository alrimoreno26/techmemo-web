import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';

import {fromUserActions} from '../store/user.actions';
import {UserPartialState} from '../store/user.reducers';
import {selectEntityLoaded} from '../store/user.selectors';

export const userResolver: ResolveFn<boolean> = () => {
  const store = inject(Store<UserPartialState>);
  const loaded$ = store.select(selectEntityLoaded);

  return loaded$.pipe(
    filter(loaded => {
      if (!loaded) {
        store.dispatch(fromUserActions.loadResolver({lazy: {page: 0, count: 25}}));
      }
      return loaded;
    }),
    take(1)
  );
};
