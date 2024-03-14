import {Injectable, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {Role} from 'src/app/core/models';
import {fromRoleActions} from '../store/role.actions';
import {RolePartialState} from '../store/role.reducers';
import {getDialog, selectAllAuthority, selectAllEntities, selectedEntity, selectEntityCount, selectEntityLoaded} from '../store/role.selectors';
import {AuthMap} from '../../../../core/models/role';
import {BaseStoreServices} from '../../../../standalone/data-table/class/base.store.services';

@Injectable({providedIn: 'platform'})
export class RoleService extends BaseStoreServices<Role> {

  /**
   * Get all Authority list
   */
  authorityList$: Signal<Array<AuthMap> | undefined>;

  constructor(private store: Store<RolePartialState>) {
    super();
    this.initState();
  }

  override initState(): void {
    this.total$ = this.store.selectSignal(selectEntityCount);
    this.loaded$ = this.store.selectSignal(selectEntityLoaded);
    this.listEntities$ = this.store.selectSignal(selectAllEntities);
    this.selectedEntity$ = this.store.selectSignal(selectedEntity);
    this.dialog$ = this.store.selectSignal(getDialog);
    this.authorityList$ = this.store.selectSignal(selectAllAuthority);
  }

  override loadAll(): void {
    this.store.dispatch(fromRoleActions.loadRole());
  }

  override create(data: Role): void {
    this.store.dispatch(fromRoleActions.createRole({entity: data}));
  }

  override update(data: Role): void {
    this.store.dispatch(fromRoleActions.updateRole({entity: data}));
  }

  override delete(id: number): void {
    this.store.dispatch(fromRoleActions.deleteRole({id}));
  }

  override setSelected(data: Role): void {
    this.store.dispatch(fromRoleActions.setSelectedRole({entity: data}));
  }

  override openModalAddOrEdit(): void {
    this.store.dispatch(fromRoleActions.openAddOrEdit());
  }
}
