import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {filter, take} from 'rxjs/operators';
import {fromOrdersListActions} from "../store/caixa.actions";
import {selectEntityLoaded} from "../store/caixa.selectors";
import {OrdersPartialState} from "../store/caixa.reducers";

export const caixaResolvers: ResolveFn<boolean> = () => {
    const store = inject(Store<OrdersPartialState>);
    const loaded$ = store.select(selectEntityLoaded);
    return loaded$.pipe(
        filter(loaded => {
            if (!loaded) {
                store.dispatch(fromOrdersListActions.loadOrdersList({
                    lazy: {
                        page: 0, count: 50, state: 'ACTIVE'
                    }
                }));
            }
            return loaded;
        }),
        take(1)
    );
}
