import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {fromRoleActions} from './role.actions';
import {Role} from 'src/app/core/models';
import {AuthMap} from '../../../../core/models';

export const ENTITY_FEATURE_KEY = 'role';

export interface State extends EntityState<Role> {
    loaded: boolean;
    dialog: boolean;
    selected?: Role;
    authorities: Array<AuthMap>;
    error?: Error | any;
}

export interface RolePartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<Role> = createEntityAdapter<Role>({
    // In this case this would be optional since primary key is id
    selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
    // Additional entity state properties
    entities: [],
    authorities: [],
    loaded: false,
    dialog: false,
    error: null
});

export const roleReducer = createReducer<State>(
    initialState,
    on(fromRoleActions.loadRoleSuccess, (state, {data}) => {
        const authMap: AuthMap[] = data.authorityList.map((m: any) => ({
            id: m.id,
            permission: m.permission,
            type: m.domain.type,
            description: m.domain.description,
            value: false
        }));
        return adapter.setAll(data.roleList, {...state, loaded: true, authorities: authMap});
    }),
    on(fromRoleActions.roleFailRequest, (state, {error}) => {
        return {...state, error};
    }),
    on(fromRoleActions.createRoleSuccess, (state, {entity}) => {
        return adapter.addOne(entity, {...state, dialog: false});
    }),
    on(fromRoleActions.updateRoleSuccess, (state, {entity}) => {
        return adapter.updateOne({id: entity.id, changes: entity}, {...state, dialog: false});
    }),
    on(fromRoleActions.deleteRoleSuccess, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(fromRoleActions.setSelectedRole, (state, {entity}) => {
        return {...state, selected: entity};
    }),
    on(fromRoleActions.openAddOrEdit, (state) => {
        return {...state, dialog: true};
    })
);

export function reducer(state: State | undefined, action: Action): State {
    return roleReducer(state, action);
}
