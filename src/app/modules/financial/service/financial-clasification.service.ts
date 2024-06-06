import {Injectable, Signal} from "@angular/core";
import {ClassifierDto, PaymentStructureTO} from "../../../core/models/financial";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {FinancialClassifiersService} from "../../../core/services/financial-classifiers.service";
import {CommerceDto} from "../../../core/models/commerce";
import {LazyLoadData} from "../../../standalone/data-table/models";
import {fromUserActions} from "../../security/user/store/user.actions";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({providedIn: 'platform'})
export class FinancialClasificationService extends StoreComponentService<ClassifierDto> {

    autocomplete$: Signal<any | null> = this.selectSignal(state => state.autocomplete);

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 25;

    constructor(private services: FinancialClassifiersService) {
        const defaultEntity: EntityState<ClassifierDto> & { autocomplete: any } =
            {entities: [], total: 0, dialog: false, loaded: false, autocomplete: []};
        super(services, defaultEntity);
    }

    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.services.findAllPaginate(lazy).pipe(
                tapResponse({
                    next: (result) => {
                        const {content, totalElements} = result;
                        this.setAll(content);
                        this.patchState({total: totalElements});
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

    // override finalizeLoad = () => {
    //     const {content, totalElements} = this.state().entities;
    //     this.setAll(content);
    //     this.patchState({total: totalElements});
    // }

}
