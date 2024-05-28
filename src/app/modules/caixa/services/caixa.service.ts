import {Injectable, Signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {BaseStoreServices} from "../../../standalone/data-table/class/base.store.services";
import {OrdersPartialState} from "../store/caixa.reducers";
import {
    dialogAdditional,
    dialogTransfer,
    getDialog, orderCreate, orderProduct,
    selectAllEntities,
    selectedEntity,
    selectedTotalElement,
    selectEntityLoaded, sentKitchen
} from "../store/caixa.selectors";
import {fromOrdersListActions, openCustomDialog} from "../store/caixa.actions";
import {CreateOrderTO, CreatePaymentTransactionTO} from "../../../core/models/orders";
import {DeleteOrderProductDto, ProductLightDto} from "../../../core/models/products";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({providedIn: 'platform'})
export class CaixaService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;

    orderCreate$: Signal<boolean>
    sentKitchen$: Signal<boolean>
    dialogTransfer$: Signal<boolean>
    dialogAdditional$: Signal<boolean>
    orderProducts$: Signal<ProductLightDto[] | undefined> = this.store.selectSignal(orderProduct);

    finalizeSubject = new BehaviorSubject<boolean>(false);
    canFinalize$: Observable<boolean> = this.finalizeSubject.asObservable();

    constructor(private store: Store<OrdersPartialState>) {
        super();
        this.initState();
    }

    override initState(): void {
        this.total$ = this.store.selectSignal(selectedTotalElement);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
        this.listEntities$ = this.store.selectSignal(selectAllEntities);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.selectedEntity$ = this.store.selectSignal(selectedEntity);
        this.orderCreate$ = this.store.selectSignal(orderCreate);
        this.sentKitchen$ = this.store.selectSignal(sentKitchen);
        this.dialogTransfer$ = this.store.selectSignal(dialogTransfer);
        this.dialogAdditional$ = this.store.selectSignal(dialogAdditional);
    }

    setFinalizeValue(newValue: boolean): void {
        this.finalizeSubject.next(newValue);
    }

    getOrders() {
        this.store.dispatch(fromOrdersListActions.loadOrdersList({
            lazy: {
                pageNumber: 0, pageSize: 50
            }
        }));
    }

    override loadAll(data: Partial<any>): void {
        this.store.dispatch(fromOrdersListActions.loadOrdersList({
            lazy: {
                ...data
            }
        }));
        super.loadAll(data);
    }

    getById(path: string[], id: any): void {
        this.store.dispatch(fromOrdersListActions.getByID({path, id}));
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromOrdersListActions.openAddOrEdit());
    }

    override create(data: CreateOrderTO): void {
        this.store.dispatch(fromOrdersListActions.createOrders({entity: data}));
    }

    createInTableOrders(data: CreateOrderTO): void {
        this.store.dispatch(fromOrdersListActions.createInTableOrders({entity: data}));
    }

    override delete(id: number): void {
        this.store.dispatch(fromOrdersListActions.deleteOrders({id}));
    }

    override update(data: any) {
        this.store.dispatch(fromOrdersListActions.updateOrders({entity: data}));
    }

    addProductsOrders(id: string, params: any) {
        this.store.dispatch(fromOrdersListActions.addProductsOrders({id, params}));
    }

    updateProductsOrders(id: string, orderId: any, params: any) {
        this.store.dispatch(fromOrdersListActions.updateProductsOrders({id, orderId, params}));
    }

    deleteProductsOrders(id: string, entity: DeleteOrderProductDto) {
        this.store.dispatch(fromOrdersListActions.deleteProductsOrders({id, entity}));
    }

    override setSelected(data: any) {
        this.store.dispatch(fromOrdersListActions.setSelectedOrders(data))
    }

    loadNewListProduct(pos: number) {
        this.store.dispatch(fromOrdersListActions.loadNewProductsOrders({pos}))
    }

    joinTables(tables: string[]) {
        this.store.dispatch(fromOrdersListActions.joinTables({entity: tables}))
    }

    transferOrders(params: any) {
        this.store.dispatch(fromOrdersListActions.transferProductsOrders({entity: params}))
    }

    payments(params: CreatePaymentTransactionTO[]) {
        this.store.dispatch(fromOrdersListActions.makePaymentsOrders({params}))
    }

    changeFieldStateOrders(id: string, params: any) {
        this.store.dispatch(fromOrdersListActions.changeFieldStateOrders({id, params}))
    }

    ordersKitchen(data: Partial<any>) {
        this.store.dispatch(fromOrdersListActions.ordersFromKitchen({lazy: data}))
    }

    sentOrdersKitchen(id: string) {
        this.store.dispatch(fromOrdersListActions.sentOrdersFromKitchen({id}))
    }

    openCustomDialog(modal: string, show: boolean) {
        this.store.dispatch(fromOrdersListActions.openCustomDialog({modal, show}))
    }

}
