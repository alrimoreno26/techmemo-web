import {Injectable, Signal} from "@angular/core";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {Observable} from "rxjs";
import {ClientService} from "../../../core/services/client.service";
import {ClientDto} from "../../../core/models";
import {LazyLoadData} from "../../../standalone/data-table/models";
import {HttpErrorResponse} from "@angular/common/http";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";

@Injectable({providedIn: 'platform'})
export class StoreClientsService extends StoreComponentService<ClientDto> {

    override serverSide = true;
    override lazyLoadOnInit = true;
    override pageSize = 10;


    constructor(private clientService: ClientService) {
        const defaultEntity: EntityState<ClientDto> ={entities: [], total: 0, dialog: false, loaded: false};
        super(clientService, defaultEntity);
    }

    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.clientService.findAllPaginate(lazy).pipe(
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

    override create = this.effect((trigger$: Observable<{ data: ClientDto }>) => trigger$.pipe(
        switchMap(({data}) => this.clientService.create({...data}).pipe(
            tapResponse({
                next: (response: ClientDto) => {
                    debugger
                    this.loadAll({
                        pageNumber: 0,
                        pageSize: 10,
                    })
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    override update = this.effect((trigger$: Observable<{ data: ClientDto }>) => trigger$.pipe(
        switchMap(({data}) => this.clientService.update(data, 'id').pipe(
            tapResponse({
                next: (response: any) => {
                    this.patchState({dialog: false});
                    this.loadAll({
                        pageNumber: 0,
                        pageSize: 10,
                    })
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    findOneById(id: string) {
        this.clientService.findOneById(id).subscribe((response: ClientDto) => {
            this.setSelected(response);
        })
    }

    closeModal() {
        this.patchState({raw: undefined, dialog: false})
    }

    emptySubCategories() {
        this.patchState({raw: undefined})
    }

}
