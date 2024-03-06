import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {ProductPartialState} from "../store/product.reducers";
import {selectEntityLoaded} from "../store/product.selectors";
import {filter, take} from 'rxjs/operators';
import {fromProductListActions, loadProductList} from "../store/product.actions";

export const productResolver: ResolveFn<boolean> = () => {
    const store = inject(Store<ProductPartialState>);
    const loaded$ = store.select(selectEntityLoaded);
    return loaded$.pipe(
        filter(loaded => {
            if (!loaded) {
                store.dispatch(fromProductListActions.loadProductList({
                    lazy: {
                        page: 0, count: 10
                    }
                }));
            }
            return loaded;
        }),
        take(1)
    );
}
