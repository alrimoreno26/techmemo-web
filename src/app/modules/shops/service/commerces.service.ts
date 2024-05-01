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

    changed$: Observable<any> = this.select(state => state.changed);

    constructor(private services: CommercesServices,
                private sessionService: SessionServices,) {
        const defaultEntity: EntityState<any> & { changed: any } =
            {entities: [], total: 0, dialog: false, loaded: false, changed: false};
        super(services, defaultEntity);
    }

    override finalizeLoad = () => {
        const {entities, total} = this.state();
        const selected = entities.find((entity: CommerceDto) => entity.id === this.sessionService.userLogged.commerces[0].commerceId);
        this.setAll(entities);
        this.sessionService.setTenantId(selected.id);
        this.patchState({total: total, selected: selected, changed: false});
    }

    override create = this.effect((trigger$: Observable<{ data: CommerceDto }>) => trigger$.pipe(
        switchMap(({data}) => this.services.create(data).pipe(
            tapResponse({
                next: (response: any) => {
                    this.setAdd(response);
                    this.patchState({dialog: false, changed: false});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    override update = this.effect((trigger$: Observable<{ data: CommerceDto }>) => trigger$.pipe(
        switchMap(({data}) => this.services.update(data, 'id').pipe(
            tapResponse({
                next: (response: any) => {
                    this.patchState({dialog: false, changed: false});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    getById(commerceId: string) {
        return this.services.findOneById(commerceId).subscribe((response: any) => {
            this.patchState({selected: response, loaded: !this.state().loaded});
        })
    }

    changeCommerceByID(commerceId: string) {
        return this.services.findOneById(commerceId).subscribe((response: any) => {
            this.setSelected(response)
            this.sessionService.setTenantId(response.id);
            this.sessionService.setCurrentStore(response);
            this.patchState({changed: true});
        })
    }


}
