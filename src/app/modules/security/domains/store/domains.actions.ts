import {createAction, props} from '@ngrx/store';

import {GeneratePassword, Role} from 'src/app/core/models';
import {LazyLoadData, LazyResultData} from '../../../../standalone/data-table/models';
import {Domains} from "../../../../core/models/role";

export enum EntityActionTypes {
    LoadResolver = '[Domains] Load First Domains',
    LoadResolverSuccess = '[Domains] Load First Domains Success',

    LoadDomains = '[Domains] Load Domains',
    LoadDomainsSuccess = '[Domains] Load Domains Success',
    DomainsFailRequest = '[Domains] Domains Fail Request',

    CreateDomains = '[Domains] Create Domains',
    CreateDomainsSuccess = '[Domains] Create Domains Success',

    UpdateDomains = '[Domains] Update Domains',
    UpdateDomainsSuccess = '[Domains] Update Domains Success',

    DeleteDomains = '[Domains] Delete Domains',
    DeleteDomainsSuccess = '[Domains] Delete Domains Success',

    SetSelectedDomains = '[Domains] Set Selected Domains',

    OpenAddOrEdit = '[Domains] Open Add Or Edit Dialog',

    EnableOrDisableDomains = '[Domains] Enable Or Disable Domains',
    EnableOrDisableDomainsSuccess = '[Domains] Enable Or Disable Domains Success',

    GeneratePassword = '[Domains] Generate Password',
    GeneratePasswordSuccess = '[Domains] Generate Password Success',

    ResetDomainsCompanyAndData = '[Domains] Reset Domains Company And Data',
    ResetDomainsCompanyAndDataSuccess = '[Domains] Reset Domains Company And Data Success'
}

export const loadResolver = createAction(EntityActionTypes.LoadResolver, props<{ lazy: LazyLoadData }>());
export const loadResolverSuccess = createAction(EntityActionTypes.LoadResolverSuccess, props<{
    data: LazyResultData<Domains>,
    role: Role[]
}>());

export const loadDomains = createAction(EntityActionTypes.LoadDomains, props<{ lazy: LazyLoadData }>());
export const loadDomainsSuccess = createAction(EntityActionTypes.LoadDomainsSuccess, props<{
    data: LazyResultData<Domains>
}>());
export const domainsFailRequest = createAction(EntityActionTypes.DomainsFailRequest, props<{ error: Error | any }>());

export const createDomains = createAction(EntityActionTypes.CreateDomains, props<{ entity: Domains }>());
export const createDomainsSuccess = createAction(EntityActionTypes.CreateDomainsSuccess, props<{ entity: Domains }>());

export const updateDomains = createAction(EntityActionTypes.UpdateDomains, props<{ entity: Domains }>());
export const updateDomainsSuccess = createAction(EntityActionTypes.UpdateDomainsSuccess, props<{ entity: Domains }>());

export const deleteDomains = createAction(EntityActionTypes.DeleteDomains, props<{ id: number }>());
export const deleteDomainsSuccess = createAction(EntityActionTypes.DeleteDomainsSuccess, props<{ id: number }>());

export const setSelectedDomains = createAction(EntityActionTypes.SetSelectedDomains, props<{ entity: Domains }>());

export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);

export const enableOrDisableDomains = createAction(EntityActionTypes.EnableOrDisableDomains, props<{ id: number }>());
export const enableOrDisableDomainsSuccess = createAction(EntityActionTypes.EnableOrDisableDomainsSuccess, props<{
    entity: Domains
}>());

export const generatePassword = createAction(EntityActionTypes.GeneratePassword, props<{ data: GeneratePassword }>());
export const generatePasswordSuccess = createAction(EntityActionTypes.GeneratePasswordSuccess);

export const resetDomainsCompanyAndData = createAction(EntityActionTypes.ResetDomainsCompanyAndData, props<{
    id: number
}>());
export const resetDomainsCompanyAndDataSuccess = createAction(EntityActionTypes.ResetDomainsCompanyAndDataSuccess);

export const fromDomainsActions = {
    loadResolver,
    loadResolverSuccess,
    loadDomains,
    loadDomainsSuccess,
    domainsFailRequest,
    updateDomains,
    updateDomainsSuccess,
    createDomains,
    createDomainsSuccess,
    deleteDomains,
    deleteDomainsSuccess,
    setSelectedDomains,
    openAddOrEdit,
    enableOrDisableDomains,
    enableOrDisableDomainsSuccess,
    generatePassword,
    generatePasswordSuccess,
    resetDomainsCompanyAndData,
    resetDomainsCompanyAndDataSuccess
};
