import {createAction, props} from '@ngrx/store';

import {GeneratePassword, Role, User} from 'src/app/core/models';
import {LazyLoadData, LazyResultData} from '../../../../standalone/data-table/models';

export enum EntityActionTypes {
  LoadResolver = '[User] Load First User',
  LoadResolverSuccess = '[User] Load First User Success',

  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  UserFailRequest = '[User] User Fail Request',

  CreateUser = '[User] Create User',
  CreateUserSuccess = '[User] Create User Success',

  UpdateUser = '[User] Update User',
  UpdateUserSuccess = '[User] Update User Success',

  DeleteUser = '[User] Delete User',
  DeleteUserSuccess = '[User] Delete User Success',

  SetSelectedUser = '[User] Set Selected User',

  OpenAddOrEdit = '[User] Open Add Or Edit Dialog',

  EnableOrDisableUser = '[User] Enable Or Disable User',
  EnableOrDisableUserSuccess = '[User] Enable Or Disable User Success',

  ResetRatingUsers = '[User] Reset Rating Users',
  ResetRatingUsersSuccess = '[User] Reset Rating Users Success',

  GeneratePassword = '[User] Generate Password',
  GeneratePasswordSuccess = '[User] Generate Password Success',

  ResetUserCompanyAndData = '[User] Reset User Company And Data',
  ResetUserCompanyAndDataSuccess = '[User] Reset User Company And Data Success'
}

export const loadResolver = createAction(EntityActionTypes.LoadResolver, props<{ lazy: LazyLoadData }>());
export const loadResolverSuccess = createAction(EntityActionTypes.LoadResolverSuccess, props<{ data: LazyResultData<User>, role: LazyResultData<Role> }>());

export const loadUser = createAction(EntityActionTypes.LoadUser, props<{ lazy: LazyLoadData }>());
export const loadUserSuccess = createAction(EntityActionTypes.LoadUserSuccess, props<{ data: LazyResultData<User> }>());
export const userFailRequest = createAction(EntityActionTypes.UserFailRequest, props<{ error: Error | any }>());

export const createUser = createAction(EntityActionTypes.CreateUser, props<{ entity: User }>());
export const createUserSuccess = createAction(EntityActionTypes.CreateUserSuccess, props<{ entity: User }>());

export const updateUser = createAction(EntityActionTypes.UpdateUser, props<{ entity: User }>());
export const updateUserSuccess = createAction(EntityActionTypes.UpdateUserSuccess, props<{ entity: User }>());

export const deleteUser = createAction(EntityActionTypes.DeleteUser, props<{ id: number }>());
export const deleteUserSuccess = createAction(EntityActionTypes.DeleteUserSuccess, props<{ id: number }>());

export const setSelectedUser = createAction(EntityActionTypes.SetSelectedUser, props<{ entity: User }>());

export const openAddOrEdit = createAction(EntityActionTypes.OpenAddOrEdit);

export const enableOrDisableUser = createAction(EntityActionTypes.EnableOrDisableUser, props<{ id: number }>());
export const enableOrDisableUserSuccess = createAction(EntityActionTypes.EnableOrDisableUserSuccess, props<{ entity: User }>());

export const resetRatingUsers = createAction(EntityActionTypes.ResetRatingUsers);
export const resetRatingUsersSuccess = createAction(EntityActionTypes.ResetRatingUsersSuccess);

export const generatePassword = createAction(EntityActionTypes.GeneratePassword, props<{ data: GeneratePassword }>());
export const generatePasswordSuccess = createAction(EntityActionTypes.GeneratePasswordSuccess);

export const resetUserCompanyAndData = createAction(EntityActionTypes.ResetUserCompanyAndData, props<{ id: number }>());
export const resetUserCompanyAndDataSuccess = createAction(EntityActionTypes.ResetUserCompanyAndDataSuccess);

export const fromUserActions = {
  loadResolver,
  loadResolverSuccess,
  loadUser,
  loadUserSuccess,
  userFailRequest,
  updateUser,
  updateUserSuccess,
  createUser,
  createUserSuccess,
  deleteUser,
  deleteUserSuccess,
  setSelectedUser,
  openAddOrEdit,
  enableOrDisableUser,
  enableOrDisableUserSuccess,
  resetRatingUsers,
  resetRatingUsersSuccess,
  generatePassword,
  generatePasswordSuccess,
  resetUserCompanyAndData,
  resetUserCompanyAndDataSuccess
};
