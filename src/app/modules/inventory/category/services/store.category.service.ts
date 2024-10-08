import {Injectable, Signal} from "@angular/core";
import {CategoryDto} from "../../../../core/models";
import {CategoryServices} from "../../../../core/services/category-services.service";
import {EntityState, StoreComponentService} from "../../../../standalone/data-table/store/store.component.service";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {Observable} from "rxjs";
import {LazyLoadData, LazyResultData} from "../../../../standalone/data-table/models";
import {HttpErrorResponse} from "@angular/common/http";
import {groupBy} from "../../../../core/util";

@Injectable({providedIn: 'platform'})
export class StoreCategoryService extends StoreComponentService<CategoryDto> {

    override serverSide = true;
    override lazyLoadOnInit = true;
    override pageSize = 10;

    subCategory$: Signal<CategoryDto[] | []> = this.selectSignal(state => state.raw);

    constructor(private categoryService: CategoryServices) {
        const defaultEntity: EntityState<CategoryDto> & { raw?: any } =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(categoryService, defaultEntity);
    }

    override loadAll = this.effect<any>((lazy$: Observable<{ lazy: LazyLoadData }>) => lazy$.pipe(
        switchMap((lazy) => {
            return this.categoryService.findAllPaginate(lazy).pipe(
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

    override create = this.effect((trigger$: Observable<{ data: CategoryDto }>) => trigger$.pipe(
        switchMap(({data}) => this.categoryService.create({...data}).pipe(
            tapResponse({
                next: (response: CategoryDto) => {
                    this.setAdd(response)
                    this.setSelected(response)
                    this.loadAll({
                        pageNumber: 0,
                        pageSize: 10,
                        type: 'PARENT'
                    })
                    this.patchState({raw: response.subCategories, dialog: true});
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    override update = this.effect((trigger$: Observable<{ data: CategoryDto }>) => trigger$.pipe(
        switchMap(({data}) => this.categoryService.update(data, 'id').pipe(
            tapResponse({
                next: (response: any) => {
                    this.patchState({dialog: false});
                    this.loadAll({
                        pageNumber: 0,
                        pageSize: 10,
                        type: 'PARENT'
                    })
                },
                error: (err: HttpErrorResponse) => this.setError(err)
            })
        ))
    ));

    findOneById(id: string) {
        this.categoryService.findOneById(id).subscribe((response: CategoryDto) => {
            this.setSelected(response);
            this.patchState({raw: response.subCategories});
        })
    }

    createSubCategory(id: string, entity: any): void {
        this.categoryService.addSubCategory(id, entity).subscribe((r) => {
            const raw = this.state().raw;
            const temporal = [...raw, r[0]];
            this.patchState({raw: [...temporal]});
        })
    }

    updateSubCategory(id: string, entity: any): void {
        this.categoryService.updateSubCategory(id, entity).subscribe(() => {
            const raw = this.state().raw;
            const temporal = raw.map((e: CategoryDto) => {
                if (e.id === id) {
                    return entity
                } else {
                    return e
                }
            });
            this.patchState({raw: temporal});
        })
    }

    loadSubCategories(lazy: any) {
        this.categoryService.subCategory(lazy).subscribe((r: LazyResultData<CategoryDto>) => {
            this.patchState({raw: r.content});
        })
    }

    uploadImageFiles(files: any) {
        this.categoryService.uploadImage(files, this.selectedEntity$().id).subscribe((r: any) => {
        })
    }

    closeModal() {
        this.patchState({raw: undefined, dialog: false})
    }

    emptySubCategories() {
        this.patchState({raw: undefined})
    }

}
