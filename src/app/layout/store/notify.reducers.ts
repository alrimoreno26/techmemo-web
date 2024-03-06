import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {fromNotifyActions, weightScale} from './notify.actions';

export const ENTITY_FEATURE_KEY = 'notify';

export interface State extends EntityState<any> {
    loaded: boolean;
    dialog: boolean;
    totalElements: number;
    selected?: any;
    error?: Error | any;
    filter: number;
    weightScale: string;
}

export interface NotifyPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
    // In this case this would be optional since primary key is id
    selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
    // Additional entity state properties
    entities: [],
    totalElements: 0,
    loaded: false,
    dialog: false,
    error: null,
    filter: 0,
    weightScale: ""
});

export const notifyReducer = createReducer<State>(
    initialState,
    on(fromNotifyActions.loadNotifySuccess, (state, {data}) => {
        return adapter.setMany(data.content, {...state, loaded: true, totalElements: data.totalElements});
    }),
    on(fromNotifyActions.notifyFailRequest, (state, {error}) => {
        return {...state, error};
    }),
    on(fromNotifyActions.setLoadedNotify, (state) => {
        return {...state, loaded: false};
    }),
    on(fromNotifyActions.createNotify, (state, {entity}) => {
        return adapter.addOne(entity, {...state});
    }),
    on(fromNotifyActions.updateNotifySuccess, (state, {entity}) => {
        return adapter.updateOne({id: entity.id, changes: {...entity, read: true}}, {...state, dialog: false});
    }),
    on(fromNotifyActions.deleteNotifySuccess, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(fromNotifyActions.setSelectedNotify, (state, {entity}) => {
        return {...state, selected: entity};
    }),
    on(fromNotifyActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    }),
    on(fromNotifyActions.markAsReadAllSuccess, (state) => {
        return adapter.map((n => ({...n, read: true})), {...state});
    }),
    on(fromNotifyActions.deleteAllSuccess, (state) => {
        return adapter.removeMany(entity => entity.read, {...state});
    }),
    on(fromNotifyActions.setFilter, (state, {filter}) => {
        return {...state, filter};
    }),
    on(fromNotifyActions.weightScale, (state, {weight}) => {
        return {...state, weightScale: weight};
    })
);

export function reducer(state: State | undefined, action: Action): State {
    return notifyReducer(state, action);
}
