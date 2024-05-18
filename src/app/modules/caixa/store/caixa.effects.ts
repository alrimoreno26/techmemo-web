import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {
    fromOrdersListActions, getProductInOrderByID, sentOrdersFromKitchen, updateProductsOrders
} from "./caixa.actions";
import {OrdersService} from "../../../core/services/comanda.service";
import {StoreTablesServices} from "../services/store.tables.services";
import {CaixaService} from "../services/caixa.service";

@Injectable()
export class CaixaEffects {

    loadOrdersList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.loadOrdersList),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromOrdersListActions.loadOrdersListSuccess({data})),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    loadOrdersAdditional$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.loadOrdersAdditional),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromOrdersListActions.loadOrdersAdditionalSuccess({data})),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    createOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.createOrders),
            switchMap(({entity}) =>
                this.service.create(entity).pipe(
                    map((data) => fromOrdersListActions.createOrdersSuccess({entity: data})),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    createInTableOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.createInTableOrders),
            switchMap(({entity}) =>
                this.service.create(entity).pipe(
                    switchMap((data) => {
                        return of(
                            fromOrdersListActions.createInTableOrdersSuccess(data),
                            fromOrdersListActions.getByID({path: ['by-table'], id: {tableId: entity.tableId}})
                        )
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    changeFieldStateOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.changeFieldStateOrders),
            switchMap(({id, params}) =>
                this.service.changeFieldState(id, params).pipe(
                    switchMap((data) => {
                        return of(
                            fromOrdersListActions.getByID({path: [], id})
                        )
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    updateOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.updateOrders),
            switchMap(({entity}) =>
                this.service.update(entity, 'id').pipe(
                    map((data) => fromOrdersListActions.updateOrdersSuccess({entity: entity})),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );
    deleteOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.deleteOrders),
            switchMap(({id}) =>
                this.service.delete(id).pipe(
                    map(() => fromOrdersListActions.deleteOrdersSuccess({id})),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    getById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.getByID),
            switchMap(({id, path}) =>
                this.service.loadOrders(path, id).pipe(
                    switchMap((data) => {
                        if (data.length === 0) {
                            const param = {
                                clientDocument: '',
                                clientName: '',
                                tableId: id.tableId
                            }
                            this.caixaService.create(param);
                        }
                        return of(fromOrdersListActions.getByIDSuccess({entity: data}))
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    getProductInOrderByID$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.getProductInOrderByID),
            switchMap(({id}) =>
                this.service.getProductOrder(id).pipe(
                    switchMap((data) => {
                        return of(fromOrdersListActions.getProductInOrderByIDSuccess({entity: data}))
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    payments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.makePaymentsOrders),
            switchMap(({params}) =>
                this.service.payments(params).pipe(
                    switchMap((response) => {
                        return of(fromOrdersListActions.makePaymentsOrdersSuccess({entity: response}))
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    joinTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.joinTables),
            switchMap(({entity}) =>
                this.service.unionTables(entity).pipe(
                    switchMap(() => {
                        this.tables.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                        return of(
                            fromOrdersListActions.joinTablesSuccess()
                        )
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    transferProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.transferProductsOrders),
            switchMap(({entity}) =>
                this.service.transferProducts(entity).pipe(
                    switchMap((response) => {
                        return of(
                            fromOrdersListActions.transferProductsOrdersSuccess({entity: response}),
                            fromOrdersListActions.openCustomDialog({modal: 'trasnfer', show: false}),
                            fromOrdersListActions.getByID({path: [], id: entity.sourceOrderId})
                        )
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    addProductsOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.addProductsOrders),
            switchMap(({id, params}) =>
                this.service.addProductsOrders(id, params).pipe(
                    map((data) => fromOrdersListActions.addProductsOrdersSuccess({entity: data})),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    updateProductsOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.updateProductsOrders),
            switchMap(({id, orderId, params}) =>
                this.service.updateProductsOrders(id, params[0]).pipe(
                    switchMap((response) => {
                        return of(
                            fromOrdersListActions.getByID({path: [], id: orderId})
                        )
                    }),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    deleteProductsOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.deleteProductsOrders),
            switchMap(({id, entity}) =>
                this.service.deleteProductsOrders(id, entity).pipe(
                    map((data) => fromOrdersListActions.deleteProductsOrdersSuccess({productId: entity.productIds})),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    ordersFromKitchen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.ordersFromKitchen),
            switchMap(({lazy}) =>
                this.service.pendingPrepare(lazy).pipe(
                    map((data) => fromOrdersListActions.ordersFromKitchenSuccess(data)),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    sentOrdersFromKitchen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOrdersListActions.sentOrdersFromKitchen),
            switchMap(({id}) =>
                this.service.sentDataToKitchen(id).pipe(
                    map((data) => fromOrdersListActions.sentOrdersFromKitchenSuccess()),
                    catchError(error => of(fromOrdersListActions.OrdersListFailRequest({error})))
                )
            )
        )
    );

    constructor(private actions$: Actions,
                private service: OrdersService,
                private caixaService: CaixaService,
                private tables: StoreTablesServices) {
    }
}
