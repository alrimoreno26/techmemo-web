import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, ENTITY_FEATURE_KEY, State} from "./fornecedores.reducers";


// Lookup the 'Entity' feature state managed by NgRx
const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

// get the selectors
const {selectIds, selectAll, selectTotal} = adapter.getSelectors();

// select the array of Entity ids
export const selectEntityIds = createSelector(getEntityState, selectIds);

// select the array of Entities
export const selectAllEntities = createSelector(getEntityState, selectAll);
export const selectEntityCount = createSelector(getEntityState, selectTotal);
export const selectEntityLoaded = createSelector(getEntityState, state => state.loaded);
export const selectedEntity = createSelector(getEntityState, state => state.selected);
export const selectedTotalElement = createSelector(getEntityState, state => state.totalElements);
export const getDialog = createSelector(getEntityState, state => state.dialog);
export const autocomplete = createSelector(getEntityState, state => state.autocomplete);
