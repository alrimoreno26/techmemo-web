import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {fromProductListActions} from "./product.actions";
import {ProductFilterDto} from "../../../../core/models/products";

export const ENTITY_FEATURE_KEY = 'product';

export interface State extends EntityState<any> {
    loaded: boolean;
    dialog: boolean;
    totalElements: number;
    additionals: any[];
    stockLow: any;
    autocomplete: any[];
    selected?: any;
    error?: Error | any;
}

export interface ProductPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
    // Additional entity state properties
    entities: [],
    additionals: [],
    autocomplete: [],
    stockLow: null,
    loaded: false,
    dialog: false,
    totalElements: 0,
    error: null
});

export const productReducer = createReducer<State>(
    initialState,
    on(fromProductListActions.loadProductListSuccess, (state, {data}) => {
        return adapter.setAll(data.content, {...state, loaded: true, totalElements: data.totalElements});
    }),
    on(fromProductListActions.autocompleteSearchSuccess, (state, {data}) => {
        return {...state, autocomplete: data.content};
    }),
    on(fromProductListActions.loadProductAdditionalSuccess, (state, {data}) => {
        let modifyProducts: any[] = [];
        data.content.forEach((x: ProductFilterDto) => {
            modifyProducts.push({
                ...x,
                unitValue: 0
            })
        })
        return {...state, additionals: modifyProducts};
    }),
    on(fromProductListActions.lowStockSuccess, (state, {data}) => {
        return {...state, stockLow: data};
    }),
    on(fromProductListActions.createProductSuccess, (state, {entity}) => {
        return adapter.addOne(entity, {...state, dialog: false});
    }),
    on(fromProductListActions.updateProductSuccess, (state, {entity}) => {
        // @ts-ignore
        return adapter.updateOne({id: entity.id, changes: entity}, {...state, dialog: false});
    }),
    on(fromProductListActions.deleteProductSuccess, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(fromProductListActions.getByIDSuccess, (state, {entity}) => {
        return {...state, selected: entity};
    }),
    on(fromProductListActions.setSelectedProduct, (state, {entity}) => {
        return {...state, selected: entity};
    }),
    on(fromProductListActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    })
);

export function reducerProduct(state: State | undefined, action: Action): State {
    return productReducer(state, action);
}
