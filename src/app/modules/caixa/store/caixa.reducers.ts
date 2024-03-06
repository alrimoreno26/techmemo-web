import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {fromOrdersListActions} from "./caixa.actions";
import {isArray, orderBy} from "lodash";


export const ENTITY_FEATURE_KEY = 'orders';

export interface State extends EntityState<any> {
    loaded: boolean;
    dialog: boolean;
    totalElements: number;
    orderCreate: boolean;
    orderProducts?: any[];
    selected?: any;
    error?: Error | any;
}

export interface OrdersPartialState {
    readonly [ENTITY_FEATURE_KEY]: State;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
    // Additional entity state properties
    entities: [],
    orderCreate: false,
    orderProducts: [],
    loaded: false,
    dialog: false,
    totalElements: 0,
    error: null
});

export const ordersReducer = createReducer<State>(
    initialState,
    on(fromOrdersListActions.loadOrdersListSuccess, (state, {data}) => {
        return adapter.setAll(orderBy(data.content, item => parseInt(item.tableNumber, 10), 'asc'), {
            ...state,
            loaded: true,
            totalElements: data.totalElements
        });
    }),
    on(fromOrdersListActions.createOrdersSuccess, (state, {entity}) => {
        return {...state, dialog: false, selected: [entity], orderCreate: true};
    }),
    on(fromOrdersListActions.createInTableOrdersSuccess, (state, {entity}) => {
        return {...state, dialog: false, orderCreate: true};
    }),
    on(fromOrdersListActions.updateOrdersSuccess, (state, {entity}) => {
        return adapter.updateOne({id: entity.id, changes: entity}, {...state, dialog: false});
    }),
    on(fromOrdersListActions.deleteOrdersSuccess, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(fromOrdersListActions.getByIDSuccess, (state, {entity}) => {
        return {
            ...state,
            selected: isArray(entity) ? entity : [entity],
            orderProducts: isArray(entity) ? entity[0]?.products || [] : entity.products || [],
            orderCreate: false
        };
    }),
    on(fromOrdersListActions.setSelectedOrders, (state, {entity}) => {
        return {...state, selected: entity ? [entity] : null};
    }),
    on(fromOrdersListActions.addProductsOrdersSuccess, (state, {entity}) => {
        const selected = state.selected.map((producto: any) => (producto.id === entity.id ? {...entity} : producto));

        return {
            ...state,
            selected,
            orderProducts: selected[0].products,
            orderCreate: false
        };
    }),
    on(fromOrdersListActions.deleteProductsOrders, (state, {productId}) => {
        const excludedValues: number[] = [];
        const tempProducts = state?.orderProducts?.filter(product => {
            if (!productId.includes(product.id)) {
                excludedValues.push(product.salePrice + product.totalAdditionalsValue);
                return true;
            }
            return false;
        }) || [];

        const totalExcludedValues = excludedValues.reduce((total, value) => total + value, 0);

        const selected = [{
            ...state.selected[0],
            products: tempProducts,
            valueToPaid: state.selected[0].valueToPaid - totalExcludedValues
        }];

        return {...state, selected, orderProducts: tempProducts};
    }),
    on(fromOrdersListActions.loadNewProductsOrders, (state, {pos}) => {
        return {...state, orderProducts: state.selected[pos]?.products};
    }),
    on(fromOrdersListActions.makePaymentsOrdersSuccess, (state, {entity}) => {
        const updatePaidProducts = (product: any, payments: any[]): any => {
            const finded = payments.find((payment: any) => payment.product.id === product.id);
            return finded && finded.valuePaid === finded.valueToPaid ? { ...product, paid: true } : { ...product };
        };

        const updateOrder = (order: any, entity: any[]): any => {
            const search = entity.find((x: any) => x.orderId === order.id);

            if (!search) {
                return { ...order, products: order.product };
            }

            const updatedProducts = order.products.map((product: any) => updatePaidProducts(product, search.payments));

            return { ...order, products: updatedProducts, payments: [...order.payments, ...search.payments] };
        };

        const selected = state.selected.map((order: any) => updateOrder(order, entity));
        return { ...state, selected };
    }),
    on(fromOrdersListActions.transferProductsOrdersSuccess, (state, {entity}) => {
        return {...state};
    }),
    on(fromOrdersListActions.openAddOrEdit, (state) => {
        return {...state, dialog: true, orderCreate: false};
    }),
    on(fromOrdersListActions.OrdersListFailRequest, (state, {error}) => {
        return {...state, error};
    }),
);

export function reducerOrders(state: State | undefined, action: Action): State {
    return ordersReducer(state, action);
}
