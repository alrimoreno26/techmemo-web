import {Injectable, Signal} from "@angular/core";
import {CategoryDto} from "../../../../core/models";
import {CategoryServices} from "../../../../core/services/category-services.service";
import {EntityState, StoreComponentService} from "../../../../standalone/data-table/store/store.component.service";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {Observable} from "rxjs";
import {LazyLoadData, LazyResultData} from "../../../../standalone/data-table/models";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({providedIn: 'platform'})
export class StoreCategoryService extends StoreComponentService<CategoryDto> {

    override serverSide = false;
    subCategory$: Signal<CategoryDto[] | []> = this.selectSignal(state => state.raw);

    constructor(private categoryService: CategoryServices) {
        const defaultEntity: EntityState<CategoryDto> & { raw?: any } =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(categoryService, defaultEntity);
    }

    override create = this.effect((trigger$: Observable<{ data: CategoryDto }>) => trigger$.pipe(
        switchMap(({data}) => this.categoryService.create({...data}).pipe(
            tapResponse({
                next: (response: CategoryDto) => {
                    this.setAdd(response)
                    this.setSelected(response)
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
        this.categoryService.findAllPaginate(lazy).subscribe((r: LazyResultData<CategoryDto>) => {
            this.patchState({raw: r.content});
        })
    }

    closeModal() {
        this.patchState({raw: [], dialog: false})
    }
}
