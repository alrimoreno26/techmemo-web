import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {BaseStoreServices} from "../../../../standalone/data-table/class/base.store.services";
import {fromSupplierListActions} from "../store/fornecedores.actions";
import {
    getDialog,
    selectAllEntities,
    selectedEntity,
    selectedTotalElement,
    selectEntityLoaded
} from "../store/fornecedores.selectors";
import {FornecedoresPartialState} from "../store/fornecedores.reducers";
import {SupplierDTO} from "../../../../core/models/supplier";

@Injectable({providedIn: 'platform'})
export class SupplierService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;

    constructor(private store: Store<FornecedoresPartialState>) {
        super();
        this.initState();
    }

    override initState(): void {
        this.total$ = this.store.selectSignal(selectedTotalElement);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
        this.listEntities$ = this.store.selectSignal(selectAllEntities);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.selectedEntity$ = this.store.selectSignal(selectedEntity);
    }

    override loadAll(data: Partial<any>): void {
        this.store.dispatch(fromSupplierListActions.loadSupplierList({
            lazy: {
                ...data
            }
        }));
        super.loadAll(data);
    }

    getById(id: string): void {
        this.store.dispatch(fromSupplierListActions.getByID({id}));
    }

    override create(data: SupplierDTO): void {
        this.store.dispatch(fromSupplierListActions.createSupplier({entity: data}));
    }

    override update(data: SupplierDTO): void {
        this.store.dispatch(fromSupplierListActions.updateSupplier({entity: data}));
    }

    override delete(id: number): void {
        this.store.dispatch(fromSupplierListActions.deleteSupplier({id}));
    }

    override setSelected(data: SupplierDTO): void {
        this.store.dispatch(fromSupplierListActions.setSelectedSupplier({entity: data}));
    }
    override openModalAddOrEdit(): void {
        this.store.dispatch(fromSupplierListActions.openAddOrEdit());
    }
}
