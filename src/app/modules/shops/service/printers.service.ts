import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {SessionServices} from "../../../core/injects/session.services";
import {PrintersServices} from "../../../core/services/printers.services";
import {Observable} from "rxjs";
import {CommerceDto, PrinterDto} from "../../../core/models/commerce";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
import {groupBy} from "../../../core/util";
import {CategoryDto} from "../../../core/models";

@Injectable({providedIn: 'root'})
export class PrintersService extends StoreComponentService<any> {

    override serverSide = true;

    constructor(private services: PrintersServices,
                private sessionService: SessionServices,) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
    }

    override create = this.effect((trigger$: Observable<{ data: PrinterDto }>) => trigger$.pipe(
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

    override update = this.effect((trigger$: Observable<{ data: Partial<PrinterDto> }>) => trigger$.pipe(
        switchMap(({data}) => this.services.update(data, 'id').pipe(
            tapResponse({
                next: (response: any) => {
                    this.setUpdate(data);
                    this.patchState({dialog: false});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));
}
