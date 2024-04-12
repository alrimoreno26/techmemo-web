import {Injectable} from '@angular/core';
import {ActionsSubject, Store} from '@ngrx/store';
import {fromUserActions} from '../store/user.actions';
import {UserPartialState} from '../store/user.reducers';
import {
    getDialog,
    getRoleList, getUserBasic,
    selectAllEntities,
    selectedEntity,
    selectEntityCount,
    selectEntityLoaded
} from '../store/user.selectors';
import {Observable, of, takeUntil} from 'rxjs';
import {ofType} from '@ngrx/effects';
import {MessageServices} from '../../../../core/injects/message.services';
import {TranslateService} from '@ngx-translate/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {catchError, map} from 'rxjs/operators';
import {BaseStoreServices} from '../../../../standalone/data-table/class/base.store.services';
import {LazyLoadData} from '../../../../standalone/data-table/models';
import {UserAdminServices} from "../../../../core/services/user.admin.services";
import {User, Role, GeneratePassword} from 'src/app/core/models';

@Injectable({providedIn: 'platform'})
export class UserService extends BaseStoreServices<User> {
    override serverSide = true;
    override lazyLoadOnInit = false;
    /**
     * List of {@link Role} as Observable
     */
    roleList$: Observable<Role[]>;
    userBasic$: Observable<User[]>;


    constructor(private store: Store<UserPartialState>,
                private actionsSubject$: ActionsSubject,
                private messageServices: MessageServices,
                private translateService: TranslateService,
                private userAdminServices: UserAdminServices) {
        super();
        this.initState();
    }

    override initState(): void {
        this.total$ = this.store.selectSignal((selectEntityCount));
        this.loaded$ = this.store.selectSignal((selectEntityLoaded));
        this.listEntities$ = this.store.selectSignal((selectAllEntities));
        this.selectedEntity$ = this.store.selectSignal((selectedEntity));
        this.dialog$ = this.store.selectSignal((getDialog));
        this.roleList$ = this.store.select(getRoleList);
        this.userBasic$ = this.store.select(getUserBasic);

        /**
         * Subscription specific Actions
         */
        this.actionsSubject$
            .pipe(takeUntil(this.ngUnsubscribe))
            .pipe(ofType(fromUserActions.resetRatingUsersSuccess))
            .subscribe(() => {
                this.messageServices.addSuccess(this.translateService.instant('security.user.messages.reset'));
            });
        this.actionsSubject$
            .pipe(takeUntil(this.ngUnsubscribe))
            .pipe(ofType(fromUserActions.generatePasswordSuccess))
            .subscribe(() => {
                this.dialogRef.close('Success');
                this.messageServices.addSuccess(this.translateService.instant('security.user.messages.generatePassword'));
            });
        this.actionsSubject$
            .pipe(takeUntil(this.ngUnsubscribe))
            .pipe(ofType(fromUserActions.enableOrDisableUserSuccess))
            .subscribe(({entity}) => {
                entity.enabled ?
                    this.messageServices.addSuccess(this.translateService.instant('security.user.messages.enabled')) :
                    this.messageServices.addSuccess(this.translateService.instant('security.user.messages.disabled'));
            });
        this.actionsSubject$
            .pipe(takeUntil(this.ngUnsubscribe))
            .pipe(ofType(fromUserActions.resetUserCompanyAndDataSuccess))
            .subscribe(() => {
                document.location.reload();
            });
    }

    override loadAll(data: LazyLoadData): void {
        this.store.dispatch(fromUserActions.loadUser({lazy: data}));
        super.loadAll(data);
    }

    loadBasic(data: LazyLoadData): void {
        this.store.dispatch(fromUserActions.loadUserBasic({lazy: data}));
    }

    override loadAllForExport(): Observable<Array<User>> {
        return this.userAdminServices
            .findAllPaginate({pageNumber: 0, pageSize: this.total$() as number})
            .pipe(
                map(users => users.content),
                catchError(() => of([] as User[]))
            );
    }

    override create(data: User): void {
        this.store.dispatch(fromUserActions.createUser({entity: data}));
    }

    override update(data: User): void {
        this.store.dispatch(fromUserActions.updateUser({entity: data}));
    }

    override delete(id: number): void {
        this.store.dispatch(fromUserActions.deleteUser({id}));
    }

    override setSelected(data: User): void {
        this.store.dispatch(fromUserActions.setSelectedUser({entity: data}));
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromUserActions.openAddOrEdit());
    }

    /**
     * Dispatch Enabled or Disable user
     * @param id : number
     */
    enableUser({id}: User): void {
        this.store.dispatch(fromUserActions.enableOrDisableUser({id}));
    }

    /**
     * Dispatch Reset Rating
     */
    resetRating(): void {
        this.store.dispatch(fromUserActions.resetRatingUsers());
    }

    /**
     * Dispatch generate password
     * @param data {@link GeneratePassword}
     * @param dialogRef {@link DynamicDialogRef}
     */
    changePass(data: GeneratePassword, dialogRef: DynamicDialogRef): void {
        this.store.dispatch(fromUserActions.generatePassword({data}));
        this.dialogRef = dialogRef;
    }

    resetUserCompany(id: number): void {
        this.store.dispatch(fromUserActions.resetUserCompanyAndData({id}));
    }
}
