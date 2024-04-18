import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {filter, take} from 'rxjs/operators';
import {FornecedoresPartialState} from "../store/fornecedores.reducers";
import {selectEntityLoaded} from "../store/fornecedores.selectors";
import {fromSupplierListActions} from "../store/fornecedores.actions";

export const fornecedoresResolvers: ResolveFn<boolean> = () => {
    const store = inject(Store<FornecedoresPartialState>);
    const loaded$ = store.select(selectEntityLoaded);
    return loaded$.pipe(
        filter(loaded => {
            if (!loaded) {
                store.dispatch(fromSupplierListActions.loadSupplierList({
                    lazy: {
                        pageNumber: 0, pageSize: 50
                    }
                }));
            }
            return loaded;
        }),
        take(1)
    );
}
