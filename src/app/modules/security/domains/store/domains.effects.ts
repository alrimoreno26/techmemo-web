import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {forkJoin, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {fromDomainsActions} from './domains.actions';
import {RoleServices} from "../../../../core/services/role.services";
import {CompanyAdminServices} from "../../../../core/services/company.admin.services";
import {DomainsService} from "../../../../core/services/domains.service";

@Injectable()
export class DomainsEffects {
    loadResolver$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDomainsActions.loadResolver),
            switchMap(({lazy}) =>
                forkJoin([
                    this.domainsServices.findAllPaginate(lazy),
                    this.roleService.findAll()
                ]).pipe(
                    map(([data, role]) => fromDomainsActions.loadResolverSuccess({data, role})),
                    catchError(error => of(fromDomainsActions.domainsFailRequest({error})))
                )
            )
        )
    );
    loadDomains$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDomainsActions.loadDomains),
            switchMap(({lazy}) =>
                this.domainsServices.findAllPaginate(lazy).pipe(
                    map((data) => fromDomainsActions.loadDomainsSuccess({data})),
                    catchError(error => of(fromDomainsActions.domainsFailRequest({error})))
                )
            )
        )
    );
    createDomains$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDomainsActions.createDomains),
            switchMap(({entity}) =>
                this.domainsServices.create(entity).pipe(
                    map((data) => fromDomainsActions.createDomainsSuccess({entity: data})),
                    catchError(error => of(fromDomainsActions.domainsFailRequest({error})))
                )
            )
        )
    );
    updateDomains$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDomainsActions.updateDomains),
            switchMap(({entity}) =>
                this.domainsServices.update(entity).pipe(
                    map((data) => fromDomainsActions.updateDomainsSuccess({entity: data})),
                    catchError(error => of(fromDomainsActions.domainsFailRequest({error})))
                )
            )
        )
    );
    deleteDomains$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromDomainsActions.deleteDomains),
            switchMap(({id}) =>
                this.domainsServices.delete(id).pipe(
                    map(() => fromDomainsActions.deleteDomainsSuccess({id})),
                    catchError(error => of(fromDomainsActions.domainsFailRequest({error})))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private domainsServices: DomainsService,
        private roleService: RoleServices,
        private companyAdminServices: CompanyAdminServices
    ) {
    }
}
