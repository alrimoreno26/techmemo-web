import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {fromUserActions} from './user.actions';
import {Role, User} from 'src/app/core/models';

export const ENTITY_FEATURE_KEY = 'user';

export interface State extends EntityState<User> {
  loaded: boolean;
  dialog: boolean;
  total: number;
  selected?: User;
  roleList: Role[];
  error?: Error | any;
}

export interface UserPartialState {
  readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  // In this case this would be optional since primary key is id
  selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
  // Additional entity state properties
  entities: [],
  roleList: [],
  total: 0,
  loaded: false,
  dialog: false,
  error: null
});

export const userReducer = createReducer<State>(
  initialState,
  on(fromUserActions.loadResolverSuccess, (state, {data, role}) => {
    return adapter.setAll(data.content, {...state, loaded: true, roleList: role.content, total: data.totalElements});
  }),
  on(fromUserActions.loadUserSuccess, (state, {data}) => {
    return adapter.setAll(data.content, {...state, total: data.totalElements});
  }),
  on(fromUserActions.userFailRequest, (state, {error}) => {
    return {...state, error};
  }),
  on(fromUserActions.createUserSuccess, (state, {entity}) => {
    return adapter.addOne(entity, {...state, dialog: false});
  }),
  on(fromUserActions.updateUserSuccess, (state, {entity}) => {
    return adapter.updateOne({id: entity.id, changes: entity}, {...state, dialog: false});
  }),
  on(fromUserActions.deleteUserSuccess, (state, {id}) => {
    return adapter.removeOne(id, state);
  }),
  on(fromUserActions.setSelectedUser, (state, {entity}) => {
    return {...state, selected: entity};
  }),
  on(fromUserActions.openAddOrEdit, (state) => {
    return {...state, dialog: true};
  }),
  on(fromUserActions.enableOrDisableUserSuccess, (state, {entity}) => {
    return adapter.updateOne({id: entity.id, changes: entity}, state);
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return userReducer(state, action);
}
