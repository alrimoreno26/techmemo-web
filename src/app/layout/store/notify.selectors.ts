import {createFeatureSelector, createSelector} from '@ngrx/store';

import {adapter, ENTITY_FEATURE_KEY, State} from './notify.reducers';

// Lookup the 'Entity' feature state managed by NgRx
const getEntityState = createFeatureSelector<State>(ENTITY_FEATURE_KEY);

// get the selectors
const {selectIds, selectTotal} = adapter.getSelectors();

// select the array of Entity ids
export const selectEntityIds = createSelector(getEntityState, selectIds);

export const weightScale = createSelector(getEntityState, state => state.weightScale);
export const kitchen = createSelector(getEntityState, state => state.kitchen);
