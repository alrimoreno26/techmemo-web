import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromDomainsActions} from '../store/domains.actions';
import {BaseStoreServices} from '../../../../standalone/data-table/class/base.store.services';
import {LazyLoadData} from '../../../../standalone/data-table/models';
import {
    selectAllEntities,
    selectEntityCount,
    selectEntityLoaded,
    selectedEntity,
    getDialog
} from "../store/domains.selectors";
import {DomainsPartialState} from "../store/domains.reducers";
import {Domains} from "../../../../core/models/role";

@Injectable({providedIn: 'platform'})
export class DomainsService extends BaseStoreServices<Domains> {
    override serverSide = true;
    override lazyLoadOnInit = false;



    constructor(private store: Store<DomainsPartialState>) {
        super();
        this.initState();
    }

    override initState(): void {
        this.total$ = this.store.selectSignal((selectEntityCount));
        this.loaded$ = this.store.selectSignal((selectEntityLoaded));
        this.listEntities$ = this.store.selectSignal((selectAllEntities));
        this.selectedEntity$ = this.store.selectSignal((selectedEntity));
        this.dialog$ = this.store.selectSignal((getDialog));
    }

    override loadAll(data: LazyLoadData): void {
        this.store.dispatch(fromDomainsActions.loadDomains({lazy: data}));
        super.loadAll(data);
    }

    override create(data: Domains): void {
        this.store.dispatch(fromDomainsActions.createDomains({entity: data}));
    }

    override update(data: Domains): void {
        this.store.dispatch(fromDomainsActions.updateDomains({entity: data}));
    }

    override delete(id: number): void {
        this.store.dispatch(fromDomainsActions.deleteDomains({id}));
    }

    override setSelected(data: Domains): void {
        this.store.dispatch(fromDomainsActions.setSelectedDomains({entity: data}));
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromDomainsActions.openAddOrEdit());
    }


}
