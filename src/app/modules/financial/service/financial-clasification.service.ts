import {Injectable, Signal} from "@angular/core";
import {ClassifierDto, PaymentStructureTO} from "../../../core/models/financial";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {FinancialClassifiersService} from "../../../core/services/financial-classifiers.service";
import {CommerceDto} from "../../../core/models/commerce";
import {LazyLoadData, LazyResultData} from "../../../standalone/data-table/models";
import {fromUserActions} from "../../security/user/store/user.actions";
import {Observable, of} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {T} from "@fullcalendar/core/internal-common";
import {LightsDTO} from "../../../core/models/utils";

@Injectable({providedIn: 'platform'})
export class FinancialClasificationService extends StoreComponentService<ClassifierDto> {

    autocomplete$: Signal<any | null> = this.selectSignal(state => state.autocomplete);
    lightEntities$: Signal<LightsDTO[]> = this.selectSignal(state => state.lightEntities);
    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 25;

    constructor(private services: FinancialClassifiersService) {
        const defaultEntity: EntityState<ClassifierDto> & { autocomplete: any, lightEntities: [] } =
            {entities: [], total: 0, dialog: false, loaded: false, autocomplete: [], lightEntities: []};
        super(services, defaultEntity);
    }

    loadLight(lazy: any) {
        this.services.findAllPaginate(lazy).subscribe((response: any) => {
            const temp = response.content.map((item: any) => {
                return {
                    code: item.code,
                    id: item.id,
                    name: item.name,
                    visibleOnlyForStructures: item.visibleOnlyForStructures
                }
            })
            this.patchState({lightEntities: temp});
        });
    }


    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.services.findAllPaginate(lazy).pipe(
                tapResponse({
                    next: (result) => {
                        const {content, page} = result;
                        this.setAll(content);
                        this.patchState({total: page.totalElements});
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            );
        })
    ));

    autocompleteSearch(lazy: any) {
        this.services.autocomplete(lazy).subscribe(data => {
            this.patchState({autocomplete: data.content});
        });
    }
}
