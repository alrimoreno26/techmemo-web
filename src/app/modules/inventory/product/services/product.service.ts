import {Injectable, Signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {ProductPartialState} from "../store/product.reducers";
import {
    getAdditional, getAutocomplete,
    getDialog,
    selectAllEntities, selectedEntity,
    selectedTotalElement,
    selectEntityLoaded
} from "../store/product.selectors";
import {fromProductListActions} from "../store/product.actions";
import {BaseStoreServices} from "../../../../standalone/data-table/class/base.store.services";
import {UnidadeService} from "../../../configuracion/unidade/services/unidade.service";
import {SupplierService} from "../../forncedores/services/supplier.service";
import {StoreCategoryService} from "../../category/services/store.category.service";
import {ProductsCreateDto} from "../../../../core/models/products";
import {fromSupplierListActions} from "../../forncedores/store/fornecedores.actions";

@Injectable({providedIn: 'platform'})
export class ProductService extends BaseStoreServices<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 15;

    additionals$: Signal<any>;
    autocomplete$: Signal<any>;

    constructor(private store: Store<ProductPartialState>,
                public unitService: UnidadeService,
                public categoryService: StoreCategoryService,
                public supplierService: SupplierService) {
        super();
        this.initState();
    }

    override initState(): void {
        this.total$ = this.store.selectSignal(selectedTotalElement);
        this.loaded$ = this.store.selectSignal(selectEntityLoaded);
        this.listEntities$ = this.store.selectSignal(selectAllEntities);
        this.dialog$ = this.store.selectSignal(getDialog);
        this.selectedEntity$ = this.store.selectSignal(selectedEntity);
        this.additionals$ = this.store.selectSignal(getAdditional);
        this.autocomplete$ = this.store.selectSignal(getAutocomplete);
    }

    autocomplete(data: Partial<any>): void {
        this.store.dispatch(fromProductListActions.autocompleteSearch({
            lazy: {
                ...data
            }
        }));
    }

    override loadAll(data: Partial<any>): void {
        this.store.dispatch(fromProductListActions.loadProductList({
            lazy: {
                ...data
            }
        }));
    }

    getAdditionalProducts(data: Partial<any>): void {
        this.store.dispatch(fromProductListActions.loadProductAdditional({
            lazy: {
                ...data
            }
        }));
    }

    getById(id: string): void {
        this.store.dispatch(fromProductListActions.getByID({id}));
    }

    override openModalAddOrEdit(): void {
        this.store.dispatch(fromProductListActions.openAddOrEdit());
        this.unitService.loadAll({
            pageNumber: 0, pageSize: 50
        })
        this.supplierService.loadAll({
            pageNumber: 0, pageSize: 50
        })
        this.categoryService.loadSubCategories({
            pageNumber: 0, pageSize: 50, type: 'SUB'
        })
    }

    override create(data: ProductsCreateDto): void {
        this.store.dispatch(fromProductListActions.createProduct({entity: data}));
    }

    override delete(id: number): void {
        this.store.dispatch(fromProductListActions.deleteProduct({id}));
    }

    override update(data: any) {
        this.store.dispatch(fromProductListActions.updateProduct({entity: data}));
    }
}
