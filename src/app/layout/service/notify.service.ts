import {Injectable} from "@angular/core";
import {BaseStoreServices} from "../../standalone/data-table/class/base.store.services";
import {select, Store} from "@ngrx/store";
import {NotifyPartialState} from "../store/notify.reducers";
import {Observable} from "rxjs";
import {weightScale} from "../store/notify.selectors";


@Injectable({providedIn: 'platform'})
export class NotifyService extends BaseStoreServices<any> {

    weightScale$: Observable<string>;
    constructor(private store: Store<NotifyPartialState>) {
        super();
        this.initState();
    }

    override initState() {
        this.weightScale$ = this.store.pipe(select(weightScale));
    }
}
