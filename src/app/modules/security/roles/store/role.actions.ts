import {createAction, props} from '@ngrx/store';

import {AuthorityTO, Role} from '../../../../core/models';

export enum EntityActionTypes {
  LoadRole = '[Role] Load Role',
  LoadRoleSuccess = '[Role] Load Role Success',
  RoleFailRequest = '[Role] Role Fail Request',

  CreateRole = '[Role] Create Role',
  CreateRoleSuccess = '[Role] Create Role Success',

  UpdateRole = '[Role] Update Role',
  UpdateRoleSuccess = '[Role] Update Role Success',

  DeleteRole = '[Role] Delete Role',
  DeleteRoleSuccess = '[Role] Delete Role Success',

  SetSelectedRole = '[Role] Set Selected Role',
  OpenAddOrEdit = '[Role] Open Add Or Edit Dialog',
}

export const loadRole = createAction(EntityActionTypes.LoadRole);
export const loadRoleSuccess = createAction(EntityActionTypes.LoadRoleSuccess, props<{ data: { roleList: Role[], authorityList: AuthorityTO[] } }>());
export const roleFailRequest = createAction(EntityActionTypes.RoleFailRequest, props<{ error: Error | any }>());

export const createRole = createAction(EntityActionTypes.CreateRole, props<{ entity: Role }>());
export const createRoleSuccess = createAction(EntityActionTypes.CreateRoleSuccess, props<{ entity: Role }>());

export const updateRole = createAction(EntityActionTypes.UpdateRole, props<{ entity: Role }>());
export const updateRoleSuccess = createAction(EntityActionTypes.UpdateRoleSuccess, props<{ entity: Role }>());

export const deleteRole = createAction(EntityActionTypes.DeleteRole, props<{ id: number }>());
export const deleteRoleSuccess = createAction(EntityActionTypes.DeleteRoleSuccess, props<{ id: number }>());

export const setSelectedRole = createAction(EntityActionTypes.SetSelectedRole, props<{ entity: Role }>());
export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);

export const fromRoleActions = {
  loadRole,
  loadRoleSuccess,
  roleFailRequest,
  updateRole,
  updateRoleSuccess,
  createRole,
  createRoleSuccess,
  deleteRole,
  deleteRoleSuccess,
  setSelectedRole,
  openAddOrEdit
};
