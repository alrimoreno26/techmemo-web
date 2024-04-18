import {createAction, props} from "@ngrx/store";
import {LazyLoadData, LazyResultData} from "../../../../standalone/data-table/models";
import {ProductDto, ProductsCreateDto} from "../../../../core/models/products";

export enum EntityActionTypes {
    LoadProductList = '[Product] Load product List',
    LoadProductListSuccess = '[Product] Load product List Success',
    ProductListFailRequest = '[Product] Product Fail Request',

    LoadProductAdditional = '[Product] Product Additional List',
    LoadProductAdditionalSuccess = '[Product] Load product Additional Success',

    GetByID = '[Product] Get By ID',
    GetByIDSuccess = '[Product] Get By ID Success',

    CreateProduct = '[Product] Create Product',
    CreateProductSuccess = '[Product] Create Product Success',

    UpdateProduct = '[Product] Update Product',
    UpdateProductSuccess = '[Product] Update Product Success',

    DeleteProduct = '[Product] Delete Product',
    DeleteProductSuccess = '[Product] Delete Product Success',

    SetSelectedProduct = '[Product] Set Selected Product',

    AutocompleteSearch = '[Product] Autocomplete Search',
    AutocompleteSearchSuccess = '[Product] Autocomplete Search Success',

    LowStock = '[Product] Low Stock',
    LowStockSuccess = '[Product] Low Stock Success',

    OpenAddOrEdit = '[Product] Open Add Or Edit Dialog',

}

export const loadProductList = createAction(EntityActionTypes.LoadProductList, props<{
    lazy: Partial<LazyLoadData>
}>());
export const loadProductListSuccess = createAction(EntityActionTypes.LoadProductListSuccess, props<{
    data: LazyResultData<any>
}>());

export const lowStock = createAction(EntityActionTypes.LowStock, props<{
    lazy: Partial<LazyLoadData>
}>());
export const lowStockSuccess = createAction(EntityActionTypes.LowStockSuccess, props<{
    data: LazyResultData<any>
}>());

export const loadProductAdditional = createAction(EntityActionTypes.LoadProductAdditional, props<{
    lazy: Partial<LazyLoadData>
}>());
export const loadProductAdditionalSuccess = createAction(EntityActionTypes.LoadProductAdditionalSuccess, props<{
    data: LazyResultData<any>
}>());
export const ProductListFailRequest = createAction(EntityActionTypes.ProductListFailRequest, props<{
    error: Error | any
}>());

export const getByID = createAction(EntityActionTypes.GetByID, props<{ id: string }>());
export const getByIDSuccess = createAction(EntityActionTypes.GetByIDSuccess, props<{ entity: ProductDto }>());

export const createProduct = createAction(EntityActionTypes.CreateProduct, props<{ entity: ProductsCreateDto }>());
export const createProductSuccess = createAction(EntityActionTypes.CreateProductSuccess, props<{ entity: ProductDto }>());

export const updateProduct = createAction(EntityActionTypes.UpdateProduct, props<{ entity: ProductsCreateDto }>());
export const updateProductSuccess = createAction(EntityActionTypes.UpdateProductSuccess, props<{ entity: ProductsCreateDto }>());

export const deleteProduct = createAction(EntityActionTypes.DeleteProduct, props<{ id: number }>());
export const deleteProductSuccess = createAction(EntityActionTypes.DeleteProductSuccess, props<{ id: number }>());

export const setSelectedProduct = createAction(EntityActionTypes.SetSelectedProduct, props<{ entity: ProductDto }>());

export const autocompleteSearch = createAction(EntityActionTypes.AutocompleteSearch, props<{
    lazy: Partial<LazyLoadData>
}>());
export const autocompleteSearchSuccess = createAction(EntityActionTypes.AutocompleteSearchSuccess, props<{
    data: LazyResultData<any>
}>());

export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);

export const fromProductListActions = {
    loadProductList,
    loadProductListSuccess,
    ProductListFailRequest,
    loadProductAdditional,
    loadProductAdditionalSuccess,
    createProduct,
    createProductSuccess,
    updateProduct,
    updateProductSuccess,
    deleteProduct,
    deleteProductSuccess,
    setSelectedProduct,
    getByID,
    getByIDSuccess,
    autocompleteSearch,
    autocompleteSearchSuccess,
    lowStock,
    lowStockSuccess,
    openAddOrEdit
};
