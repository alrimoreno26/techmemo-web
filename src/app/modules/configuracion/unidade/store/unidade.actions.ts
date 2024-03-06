import {createAction, props} from "@ngrx/store";
import {LazyLoadData, LazyResultData} from "../../../../standalone/data-table/models";
import {UnitsMeasurementsDTO} from "../../../../core/models";

export enum EntityActionTypes {
    LoadUnitList = '[UnitsMeasurements] Load UnitsMeasurements List',
    LoadUnitListSuccess = '[UnitsMeasurements] Load UnitsMeasurements List Success',
    UnitListFailRequest = '[UnitsMeasurements] UnitsMeasurements Fail Request',
    OpenAddOrEdit = '[UnitsMeasurements] Open Add Or Edit Dialog',

    CreateUnit = '[UnitsMeasurements] Create Unit',
    CreateUnitSuccess = '[UnitsMeasurements] Create Unit Success',

    UpdateUnit = '[UnitsMeasurements] Update Unit',
    UpdateUnitSuccess = '[UnitsMeasurements] Update Unit Success',

    DeleteUnit = '[UnitsMeasurements] Delete Unit',
    DeleteUnitSuccess = '[UnitsMeasurements] Delete Unit Success',

    SetSelectedUnit = '[UnitsMeasurements] Set Selected Unit',
}

export const loadUnitList = createAction(EntityActionTypes.LoadUnitList, props<{
    lazy: Partial<LazyLoadData>
}>());
export const loadUnitListSuccess = createAction(EntityActionTypes.LoadUnitListSuccess, props<{
    data: LazyResultData<UnitsMeasurementsDTO>
}>());
export const UnitListFailRequest = createAction(EntityActionTypes.UnitListFailRequest, props<{
    error: Error | any
}>());

export const createUnit = createAction(EntityActionTypes.CreateUnit, props<{ entity: UnitsMeasurementsDTO }>());
export const createUnitSuccess = createAction(EntityActionTypes.CreateUnitSuccess, props<{ entity: UnitsMeasurementsDTO }>());

export const updateUnit = createAction(EntityActionTypes.UpdateUnit, props<{ entity: UnitsMeasurementsDTO }>());
export const updateUnitSuccess = createAction(EntityActionTypes.UpdateUnitSuccess, props<{ entity: UnitsMeasurementsDTO }>());

export const deleteUnit = createAction(EntityActionTypes.DeleteUnit, props<{ id: number }>());
export const deleteUnitSuccess = createAction(EntityActionTypes.DeleteUnitSuccess, props<{ id: number }>());

export const setSelectedUnit = createAction(EntityActionTypes.SetSelectedUnit, props<{ entity: UnitsMeasurementsDTO }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);

export const fromUnitActions = {
    loadUnitList,
    loadUnitListSuccess,
    UnitListFailRequest,
    createUnit,
    createUnitSuccess,
    updateUnit,
    updateUnitSuccess,
    deleteUnit,
    deleteUnitSuccess,
    setSelectedUnit,
    openAddOrEdit
};
