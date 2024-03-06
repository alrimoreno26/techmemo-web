import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {filter, take} from 'rxjs/operators';
import {UnidadePartialState} from "../store/unidade.reducers";
import {selectEntityLoaded} from "../store/unidade.selectors";
import {fromUnitActions} from "../store/unidade.actions";

export const unidadeResolvers: ResolveFn<boolean> = () => {
    const store = inject(Store<UnidadePartialState>);
    const loaded$ = store.select(selectEntityLoaded);
    return loaded$.pipe(
        filter(loaded => {
            if (!loaded) {
                store.dispatch(fromUnitActions.loadUnitList({
                    lazy: {
                        page: 0, count: 50
                    }
                }));
            }
            return loaded;
        }),
        take(1)
    );
}
