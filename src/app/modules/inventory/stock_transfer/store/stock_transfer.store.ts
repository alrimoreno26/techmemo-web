import {Injectable} from "@angular/core";
import {ProductServices} from "../../../../core/services/product-services.service";
import {Actions} from "@ngrx/effects";
import {EntityState, StoreComponentService} from "../../../../standalone/data-table/store/store.component.service";
import {Observable} from "rxjs";
import {PurchasesService} from "../../../../core/services/purchases.service";

@Injectable({providedIn: 'platform'})
export class Stock_TransferStore extends StoreComponentService<any>{

    autocomplete$: Observable<any[]> = this.select(state => state.searchAutocomplete);

    constructor(private actions$: Actions,
                private stockTransfer: ProductServices) {
        const defaultEntity: EntityState<any> & { searchAutocomplete: any[] } =
            {entities: [], total: 0, dialog: true, loaded: false, searchAutocomplete:[]};
        super(stockTransfer, defaultEntity);
    }

    autocomplete(data: Partial<any>): void {
        this.stockTransfer.autocomplete(data).subscribe((res) => {
            this.patchState({searchAutocomplete: res.content});
        })
    }
}
