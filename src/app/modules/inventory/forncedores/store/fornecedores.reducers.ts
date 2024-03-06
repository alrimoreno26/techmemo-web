import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {fromSupplierListActions} from "./fornecedores.actions";
import {SupplierCompanyDTO, SupplierPersonDTO} from "../../../../core/models/supplier";

export const ENTITY_FEATURE_KEY = 'fornecedores';

export interface State extends EntityState<any> {
    loaded: boolean;
    dialog: boolean;
    totalElements: number;
    selected?: any;
    error?: Error | any;
}

export interface FornecedoresPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
    // Additional entity state properties
    entities: [],
    loaded: false,
    dialog: false,
    totalElements: 0,
    error: null
});

export const fornecedoresReducer = createReducer<State>(
    initialState,
    on(fromSupplierListActions.loadSupplierListSuccess, (state, {data}) => {
        const dataWithName = data.content.map((element) => ({
            ...element,
            identification: element.type === 'COMPANY' ? element.fantasyName : element.name + ' ' + element.lastName
        }));
        return adapter.setAll(dataWithName, {...state, loaded: true, totalElements: data.totalElements});
    }),
    on(fromSupplierListActions.createSupplierSuccess, (state, {entity}) => {
        const dataWithName = {
            ...entity,
            identification: entity.type === 'COMPANY' ? (entity as SupplierCompanyDTO).fantasyName : (entity as SupplierPersonDTO).name + ' ' + (entity as SupplierPersonDTO).lastName
        };
        return adapter.addOne(dataWithName, {...state, dialog: false});
    }),
    on(fromSupplierListActions.updateSupplierSuccess, (state, {entity}) => {
        return adapter.updateOne({id: entity.id, changes: entity}, {...state, dialog: false});
    }),
    on(fromSupplierListActions.deleteSupplierSuccess, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(fromSupplierListActions.getByIDSuccess, (state, {entity}) => {
        return {...state, selected: entity};
    }),
    on(fromSupplierListActions.setSelectedSupplier, (state, {entity}) => {
        return {...state, selected: entity};
    }),
    on(fromSupplierListActions.SupplierListFailRequest, (state, {error}) => {
        return {...state, error};
    }),
    on(fromSupplierListActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    })
);

export function reducerFornecedores(state: State | undefined, action: Action): State {
    return fornecedoresReducer(state, action);
}
