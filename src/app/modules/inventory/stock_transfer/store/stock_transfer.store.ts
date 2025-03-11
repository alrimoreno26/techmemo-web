import {Injectable} from "@angular/core";
import {ProductServices} from "../../../../core/services/product-services.service";
import {Actions} from "@ngrx/effects";
import {EntityState, StoreComponentService} from "../../../../standalone/data-table/store/store.component.service";
import {Observable} from "rxjs";
import {PurchasesService} from "../../../../core/services/purchases.service";
import {StockTransferService} from "../../../../core/services/stock-transfer.service";
import {LazyLoadData} from "../../../../standalone/data-table/models";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {StockTransferDto} from "../../../../core/models/StockTransfer";

@Injectable({providedIn: 'platform'})
export class Stock_TransferStore extends StoreComponentService<any>{

    override serverSide = true;
    override lazyLoadOnInit = true;
    override pageSize = 10;

    autocomplete$: Observable<any[]> = this.select(state => state.searchAutocomplete);

    constructor(private actions$: Actions,
                private stockTransfer: StockTransferService,
                private productServices: ProductServices) {
        const defaultEntity: EntityState<any> & { searchAutocomplete: any[] } =
            {entities: [], total: 0, dialog: true, loaded: false, searchAutocomplete:[]};
        super(stockTransfer, defaultEntity);
    }

    autocomplete(data: Partial<any>): void {
        this.productServices.autocomplete(data).subscribe((res) => {
            this.patchState({searchAutocomplete: res.content});
        })
    }

    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.stockTransfer.findAllPaginate(lazy).pipe(
                tapResponse({
                    next: (result) => {
                        const {content, page} = result;
                        const modify: StockTransferDto[] = content.map((x) => {
                            return {
                                ...x,
                                countProducts: x.products.length
                            }
                        });
                        this.setAll(modify);
                        this.patchState({total: page.totalElements});
                    },
                    error: (err: HttpErrorResponse) => this.setError(err.error)
                })
            );
        })
    ));
}
