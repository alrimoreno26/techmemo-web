import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {DomainsPartialState} from "../store/domains.reducers";
import {selectEntityLoaded} from "../store/domains.selectors";
import {fromDomainsActions} from "../store/domains.actions";


export const domainsResolvers: ResolveFn<boolean> = () => {
  const store = inject(Store<DomainsPartialState>);
  const loaded$ = store.select(selectEntityLoaded);

  return loaded$.pipe(
    filter(loaded => {
      if (!loaded) {
        store.dispatch(fromDomainsActions.loadResolver({lazy: {page: 0, count: 25}}));
      }
      return loaded;
    }),
    take(1)
  );
};
