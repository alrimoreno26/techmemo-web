import {createAction, props} from "@ngrx/store";
import {LazyLoadData, LazyResultData} from "../../../standalone/data-table/models";
import {CreateOrderTO, CreatePaymentTransactionTO, OrdersTO} from "../../../core/models/orders";
import {DeleteOrderProductDto} from "../../../core/models/products";

export enum EntityActionTypes {
    LoadOrdersList = '[Orders] Load Orders List',
    LoadOrdersListSuccess = '[Orders] Load Orders List Success',
    OrdersListFailRequest = '[Orders] Orders Fail Request',

    LoadOrdersAdditional = '[Orders] Orders Additional List',
    LoadOrdersAdditionalSuccess = '[Orders] Load Orders Additional Success',

    GetByID = '[Orders] Get By ID',
    GetByIDSuccess = '[Orders] Get By ID Success',

    CreateOrders = '[Orders] Create Orders',
    CreateInTableOrders = '[Orders] Create In Table Orders',
    CreateOrdersSuccess = '[Orders] Create Orders Success',
    CreateInTableOrdersSuccess = '[Orders] Create In Table Orders Success',

    UpdateOrders = '[Orders] Update Orders',
    UpdateOrdersSuccess = '[Orders] Update Orders Success',

    DeleteOrders = '[Orders] Delete Orders',
    DeleteOrdersSuccess = '[Orders] Delete Orders Success',

    AddProductsOrders = '[Orders] Add Products Orders',
    AddProductsOrdersSuccess = '[Orders] Add Products Orders Success',
    DeleteProductsOrders = '[Orders] Delete Products Orders',
    DeleteProductsOrdersSuccess = '[Orders] Delete Products Orders Success',

    SetSelectedOrders = '[Orders] Set Selected Orders',
    LoadNewProductsOrders = '[Orders] Set New List Products Orders',

    JoinTables = '[Orders] Join Tables',
    JoinTablesSuccess = '[Orders] Join Tables Success',

    TransferProductsOrders = '[Orders] Transfer Products Orders',
    TransferProductsOrdersSuccess = '[Orders] Transfer Products Orders Success',

    MakePaymentsOrders = '[Orders] Make Payments Orders',
    MakePaymentsOrdersSuccess = '[Orders] Make Payments Orders Success',

    ChangeFieldStateOrders = '[Orders] Change Field State Orders',
    ChangeFieldStateOrdersSuccess = '[Orders] Change Field State Orders Success',

    OpenAddOrEdit = '[Orders] Open Add Or Edit Dialog',

}

export const loadOrdersList = createAction(EntityActionTypes.LoadOrdersList, props<{
    lazy: Partial<LazyLoadData>
}>());
export const loadOrdersListSuccess = createAction(EntityActionTypes.LoadOrdersListSuccess, props<{
    data: LazyResultData<any>
}>());

export const loadOrdersAdditional = createAction(EntityActionTypes.LoadOrdersAdditional, props<{
    lazy: Partial<LazyLoadData>
}>());
export const loadOrdersAdditionalSuccess = createAction(EntityActionTypes.LoadOrdersAdditionalSuccess, props<{
    data: LazyResultData<any>
}>());
export const OrdersListFailRequest = createAction(EntityActionTypes.OrdersListFailRequest, props<{
    error: Error | any
}>());

export const getByID = createAction(EntityActionTypes.GetByID, props<{ path: string[],id: any }>());
export const getByIDSuccess = createAction(EntityActionTypes.GetByIDSuccess, props<{ entity: any }>());

export const createOrders = createAction(EntityActionTypes.CreateOrders, props<{ entity: CreateOrderTO }>());
export const createInTableOrders = createAction(EntityActionTypes.CreateInTableOrders, props<{ entity: CreateOrderTO }>());
export const createOrdersSuccess = createAction(EntityActionTypes.CreateOrdersSuccess, props<{ entity: any }>());
export const createInTableOrdersSuccess = createAction(EntityActionTypes.CreateInTableOrdersSuccess, props<{ entity: any }>());

export const addProductsOrders = createAction(EntityActionTypes.AddProductsOrders, props<{ id: string, params:any[] }>());
export const addProductsOrdersSuccess = createAction(EntityActionTypes.AddProductsOrdersSuccess, props<{ entity: OrdersTO }>());

export const deleteProductsOrders = createAction(EntityActionTypes.DeleteProductsOrders, props<{ id: string, entity:DeleteOrderProductDto }>());
export const deleteProductsOrdersSuccess = createAction(EntityActionTypes.DeleteProductsOrdersSuccess, props<{ productId:string[] }>());

export const updateOrders = createAction(EntityActionTypes.UpdateOrders, props<{ entity: OrdersTO }>());
export const updateOrdersSuccess = createAction(EntityActionTypes.UpdateOrdersSuccess, props<{ entity: OrdersTO }>());

export const deleteOrders = createAction(EntityActionTypes.DeleteOrders, props<{ id: number }>());
export const deleteOrdersSuccess = createAction(EntityActionTypes.DeleteOrdersSuccess, props<{ id: number }>());

export const setSelectedOrders = createAction(EntityActionTypes.SetSelectedOrders, props<{ entity: OrdersTO }>());

export const joinTables = createAction(EntityActionTypes.JoinTables, props<{ entity: string[] }>());
export const joinTablesSuccess = createAction(EntityActionTypes.JoinTablesSuccess);
export const transferProductsOrders = createAction(EntityActionTypes.TransferProductsOrders, props<{ entity: any }>());
export const transferProductsOrdersSuccess = createAction(EntityActionTypes.TransferProductsOrdersSuccess, props<{ entity: any }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);
export const loadNewProductsOrders = createAction(EntityActionTypes.LoadNewProductsOrders, props<{ pos: number }>());
export const makePaymentsOrders = createAction(EntityActionTypes.MakePaymentsOrders, props<{ params: CreatePaymentTransactionTO[] }>());
export const makePaymentsOrdersSuccess = createAction(EntityActionTypes.MakePaymentsOrdersSuccess, props<{ entity: any[] }>());
export const changeFieldStateOrders = createAction(EntityActionTypes.ChangeFieldStateOrders, props<{ id: string, params: any }>());
export const changeFieldStateOrdersSuccess = createAction(EntityActionTypes.ChangeFieldStateOrdersSuccess, props<{ entity: any[] }>());

export const fromOrdersListActions = {
    loadOrdersList,
    loadOrdersListSuccess,
    OrdersListFailRequest,
    loadOrdersAdditional,
    loadOrdersAdditionalSuccess,
    createOrders,
    createInTableOrders,
    createOrdersSuccess,
    createInTableOrdersSuccess,
    updateOrders,
    updateOrdersSuccess,
    deleteOrders,
    deleteOrdersSuccess,
    setSelectedOrders,
    getByID,
    getByIDSuccess,
    addProductsOrders,
    addProductsOrdersSuccess,
    deleteProductsOrders,
    deleteProductsOrdersSuccess,
    openAddOrEdit,
    joinTables,
    joinTablesSuccess,
    transferProductsOrders,
    transferProductsOrdersSuccess,
    makePaymentsOrders,
    makePaymentsOrdersSuccess,
    changeFieldStateOrders,
    changeFieldStateOrdersSuccess,
    loadNewProductsOrders
};
