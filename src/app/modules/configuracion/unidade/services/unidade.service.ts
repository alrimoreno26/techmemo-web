import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {BaseStoreServices} from "../../../../standalone/data-table/class/base.store.services";
import {fromUnitActions} from "../store/unidade.actions";
import {
    getDialog,
    selectAllEntities,
    selectedEntity,
    selectedTotalElement,
    selectEntityLoaded
} from "../store/unidade.selectors";
import {UnidadePartialState} from "../store/unidade.reducers";
import {UnitsMeasurementsDTO} from "../../../../core/models";

@Injectable({providedIn: 'platform'})
export class UnidadeService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;

    constructor(private store: Store<UnidadePartialState>) {
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
        this.store.dispatch(fromUnitActions.loadUnitList({
            lazy: {
                ...data
            }
        }));
        super.loadAll(data);
    }

    override create(data: UnitsMeasurementsDTO): void {
        this.store.dispatch(fromUnitActions.createUnit({entity: data}));
    }

    override update(data: UnitsMeasurementsDTO): void {
        this.store.dispatch(fromUnitActions.updateUnit({entity: data}));
    }

    override delete(id: number): void {
        this.store.dispatch(fromUnitActions.deleteUnit({id}));
    }

    override setSelected(data: UnitsMeasurementsDTO): void {
        this.store.dispatch(fromUnitActions.setSelectedUnit({entity: data}));
    }
    override openModalAddOrEdit(): void {
        this.store.dispatch(fromUnitActions.openAddOrEdit());
    }
}
