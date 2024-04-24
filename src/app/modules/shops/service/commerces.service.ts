import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {CommercesServices} from "../../../core/services/commerces.services";
import {SessionServices} from "../../../core/injects/session.services";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {CommerceDto} from "../../../core/models/commerce";

@Injectable({providedIn: 'root'})
export class CommercesService extends StoreComponentService<any> {

    override serverSide = false;
    constructor(private services: CommercesServices,
                private sessionService: SessionServices,) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
    }

    override finalizeLoad = () => {
        const {entities, total} = this.state();
        this.setAll(entities);
        this.sessionService.setTenantId(entities[0].id);
        this.patchState({total: total, selected: entities[0]});
    }

    override create = this.effect((trigger$: Observable<{ data: CommerceDto }>) => trigger$.pipe(
        switchMap(({data}) => this.services.create(data).pipe(
            tapResponse({
                next: (response: any) => {
                    this.setAdd(response);
                    this.patchState({dialog: false});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    override update = this.effect((trigger$: Observable<{ data: CommerceDto }>) => trigger$.pipe(
        switchMap(({data}) => this.services.update(data, 'id').pipe(
            tapResponse({
                next: (response: any) => {
                    this.patchState({dialog: false});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    getById() {
        return this.services.findOneById(this.sessionService.userLogged.commerces[0].commerceId).subscribe((response: any) => {
            this.patchState({ selected: response});
        })
    }

    closeModal() {
        this.patchState({raw: [], dialog: false})
    }

}
