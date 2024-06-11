import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {fromDomainsActions} from './domains.actions';
import {Domains} from "../../../../core/models/role";

export const ENTITY_FEATURE_KEY = 'domains';

export interface State extends EntityState<Domains> {
  loaded: boolean;
  dialog: boolean;
  total: number;
  selected?: Domains;
  error?: Error | any;
}

export interface DomainsPartialState {
  readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<Domains> = createEntityAdapter<Domains>({
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

export const domainsReducer = createReducer<State>(
  initialState,
  on(fromDomainsActions.loadResolverSuccess, (state, {data, role}) => {
    return adapter.setAll(data.content, {...state, loaded: true, roleList: role, total: data.page.totalElements});
  }),
  on(fromDomainsActions.loadDomainsSuccess, (state, {data}) => {
    return adapter.setAll(data.content, {...state, total: data.page.totalElements});
  }),
  on(fromDomainsActions.domainsFailRequest, (state, {error}) => {
    return {...state, error};
  }),
  on(fromDomainsActions.createDomainsSuccess, (state, {entity}) => {
    return adapter.addOne(entity, {...state, dialog: false});
  }),
  on(fromDomainsActions.updateDomainsSuccess, (state, {entity}) => {
    return adapter.updateOne({id: entity.id, changes: entity}, {...state, dialog: false});
  }),
  on(fromDomainsActions.deleteDomainsSuccess, (state, {id}) => {
    return adapter.removeOne(id, state);
  }),
  on(fromDomainsActions.setSelectedDomains, (state, {entity}) => {
    return {...state, selected: entity};
  }),
  on(fromDomainsActions.openAddOrEdit, (state) => {
    return {...state, dialog: true};
  }),
  on(fromDomainsActions.enableOrDisableDomainsSuccess, (state, {entity}) => {
    return adapter.updateOne({id: entity.id, changes: entity}, state);
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return domainsReducer(state, action);
}
