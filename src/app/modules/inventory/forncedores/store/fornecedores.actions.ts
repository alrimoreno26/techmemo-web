import {createAction, props} from "@ngrx/store";
import {LazyLoadData, LazyResultData} from "../../../../standalone/data-table/models";
import {SupplierDTO} from "../../../../core/models/supplier";
import {ProductDto} from "../../../../core/models/products";

export enum EntityActionTypes {
    LoadSupplierList = '[Supplier] Load Supplier List',
    LoadSupplierListSuccess = '[Supplier] Load Supplier List Success',
    SupplierListFailRequest = '[Supplier] Supplier Fail Request',

    GetByID = '[Supplier] Get By ID',
    GetByIDSuccess = '[Supplier] Get By ID Success',

    CreateSupplier = '[Supplier] Create Supplier',
    CreateSupplierSuccess = '[Supplier] Create Supplier Success',

    UpdateSupplier = '[Supplier] Update Supplier',
    UpdateSupplierSuccess = '[Supplier] Update Supplier Success',

    DeleteSupplier = '[Supplier] Delete Supplier',
    DeleteSupplierSuccess = '[Supplier] Delete Supplier Success',

    SetSelectedSupplier = '[Supplier] Set Selected Supplier',
    OpenAddOrEdit = '[Supplier] Open Add Or Edit Dialog',
}

export const loadSupplierList = createAction(EntityActionTypes.LoadSupplierList, props<{
    lazy: Partial<LazyLoadData>
}>());
export const loadSupplierListSuccess = createAction(EntityActionTypes.LoadSupplierListSuccess, props<{
    data: LazyResultData<any>
}>());
export const SupplierListFailRequest = createAction(EntityActionTypes.SupplierListFailRequest, props<{
    error: Error | any
}>());

export const getByID = createAction(EntityActionTypes.GetByID, props<{ id: string }>());
export const getByIDSuccess = createAction(EntityActionTypes.GetByIDSuccess, props<{ entity: SupplierDTO }>());
export const createSupplier = createAction(EntityActionTypes.CreateSupplier, props<{ entity: SupplierDTO }>());
export const createSupplierSuccess = createAction(EntityActionTypes.CreateSupplierSuccess, props<{ entity: SupplierDTO }>());

export const updateSupplier = createAction(EntityActionTypes.UpdateSupplier, props<{ entity: SupplierDTO }>());
export const updateSupplierSuccess = createAction(EntityActionTypes.UpdateSupplierSuccess, props<{ entity: SupplierDTO }>());

export const deleteSupplier = createAction(EntityActionTypes.DeleteSupplier, props<{ id: number }>());
export const deleteSupplierSuccess = createAction(EntityActionTypes.DeleteSupplierSuccess, props<{ id: number }>());

export const setSelectedSupplier = createAction(EntityActionTypes.SetSelectedSupplier, props<{ entity: SupplierDTO }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);

export const fromSupplierListActions = {
    loadSupplierList,
    loadSupplierListSuccess,
    SupplierListFailRequest,
    createSupplier,
    createSupplierSuccess,
    updateSupplier,
    updateSupplierSuccess,
    deleteSupplier,
    deleteSupplierSuccess,
    setSelectedSupplier,
    getByID,
    getByIDSuccess,
    openAddOrEdit
};
