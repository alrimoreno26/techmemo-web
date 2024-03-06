import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {fromUnitActions} from "./unidade.actions";

export const ENTITY_FEATURE_KEY = 'unitsMeasurements';

export interface State extends EntityState<any> {
    loaded: boolean;
    dialog: boolean;
    totalElements: number;
    selected?: any;
    error?: Error | any;
}

export interface UnidadePartialState {
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

export const UnitsMeasurementsReducer = createReducer<State>(
    initialState,
    on(fromUnitActions.loadUnitListSuccess, (state, {data}) => {
        return adapter.setAll(data.content, {...state, loaded: true, totalElements: data.totalElements});
    }),
    on(fromUnitActions.createUnitSuccess, (state, {entity}) => {
        return adapter.addOne(entity, {...state, dialog: false});
    }),
    on(fromUnitActions.updateUnitSuccess, (state, {entity}) => {
        return adapter.updateOne({id: entity.id, changes: entity}, {...state, dialog: false});
    }),
    on(fromUnitActions.deleteUnitSuccess, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(fromUnitActions.setSelectedUnit, (state, {entity}) => {
        return {...state, selected: entity};
    }),
    on(fromUnitActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    })
);

export function reducerUnitsMeasurements(state: State | undefined, action: Action): State {
    return UnitsMeasurementsReducer(state, action);
}
