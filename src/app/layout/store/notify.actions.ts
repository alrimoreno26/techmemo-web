import {createAction, props} from '@ngrx/store';

import {LazyLoadData, LazyResultData} from '../../standalone/data-table/models';

export enum EntityActionTypes {
    LoadNotify = '[Notify] Load Notify',
    LoadNotifySuccess = '[Notify] Load Notify Success',
    NotifyFailRequest = '[Notify] Notify Fail Request',
    SetLoadedNotify = '[Notify] Set Loaded Notify',

    CreateNotify = '[Notify] Create Notify',

    UpdateNotify = '[Notify] Update Notify',
    UpdateNotifySuccess = '[Notify] Update Notify Success',

    DeleteNotify = '[Notify] Delete Notify',
    DeleteNotifySuccess = '[Notify] Delete Notify Success',

    SetSelectedNotify = '[Notify] Set Selected Notify',
    MarkAsReadAll = '[Notify] Set Mark All as Read Notify',
    MarkAsReadAllSuccess = '[Notify] Set Mark all as Read Notify Success',
    DeleteAll = '[Notify] Delete All Notify',
    DeleteAllSuccess = '[Notify] Delete All Notify Success',

    OpenAddOrEdit = '[Notify] Open Add Or Edit Dialog',
    SetFilter = '[Notify] Set Filter by target',

    WeightScale = '[Notify] Set Weight Scale',
}

export const loadNotify = createAction(EntityActionTypes.LoadNotify, props<{ lazy: LazyLoadData }>());
export const loadNotifySuccess = createAction(EntityActionTypes.LoadNotifySuccess, props<{
    data: LazyResultData<any>
}>());
export const notifyFailRequest = createAction(EntityActionTypes.NotifyFailRequest, props<{ error: Error | any }>());
export const setLoadedNotify = createAction(EntityActionTypes.SetLoadedNotify);

export const createNotify = createAction(EntityActionTypes.CreateNotify, props<{ entity: any }>());

export const updateNotify = createAction(EntityActionTypes.UpdateNotify, props<{ entity: any }>());
export const updateNotifySuccess = createAction(EntityActionTypes.UpdateNotifySuccess, props<{ entity: any }>());

export const deleteNotify = createAction(EntityActionTypes.DeleteNotify, props<{ id: number }>());
export const deleteNotifySuccess = createAction(EntityActionTypes.DeleteNotifySuccess, props<{ id: number }>());
export const deleteAll = createAction(EntityActionTypes.DeleteAll);
export const deleteAllSuccess = createAction(EntityActionTypes.DeleteAllSuccess);

export const setSelectedNotify = createAction(EntityActionTypes.SetSelectedNotify, props<{ entity: any }>());

export const markAsReadAll = createAction(EntityActionTypes.MarkAsReadAll);
export const markAsReadAllSuccess = createAction(EntityActionTypes.MarkAsReadAllSuccess);
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);
export const setFilter = createAction(EntityActionTypes.SetFilter, props<{ filter: number }>());
export const weightScale = createAction(EntityActionTypes.WeightScale, props<{ weight: string }>());

export const fromNotifyActions = {
    loadNotify,
    setLoadedNotify,
    loadNotifySuccess,
    notifyFailRequest,
    updateNotify,
    updateNotifySuccess,
    createNotify,
    deleteNotify,
    deleteNotifySuccess,
    setSelectedNotify,
    openAddOrEdit,
    markAsReadAll,
    markAsReadAllSuccess,
    setFilter,
    weightScale,
    deleteAll,
    deleteAllSuccess
};
