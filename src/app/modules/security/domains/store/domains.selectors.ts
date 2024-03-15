import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, ENTITY_FEATURE_KEY, State} from "./domains.reducers";


// Lookup the 'Entity' feature state managed by NgRx
const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

// get the selectors
const {selectIds, selectAll} = adapter.getSelectors();

// select the array of Entity ids
export const selectEntityIds = createSelector(getEntityState, selectIds);

// select the array of Entities
export const selectAllEntities = createSelector(getEntityState, selectAll);

// select the total Entity count
export const selectEntityCount = createSelector(getEntityState, state => state.total);

// select the Entity by Id
export const selectEntityId = createSelector(getEntityState, (state: State, prop: { id: number }) => state.entities[prop.id]);

// selected Entity from table
export const selectedEntity = createSelector(getEntityState, state => state.selected);

// select entity loaded flag
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);

// select entity error
export const selectError = createSelector(getEntityState, state => state.error);

// get value from dialog visibility
export const getDialog = createSelector(getEntityState, state => state.dialog);

