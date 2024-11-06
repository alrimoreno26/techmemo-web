import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fromProductListActions, loadProductAdditional} from "./product.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of, tap} from "rxjs";
import {ProductServices} from "../../../../core/services/product-services.service";
import {ProductService} from "../services/product.service";

@Injectable()
export class ProductEffects {

    loadProductList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.loadProductList),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromProductListActions.loadProductListSuccess({data})),
                    catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                )
            )
        )
    );

    autcomplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.autocompleteSearch),
            switchMap(({lazy}) =>
                this.service.autocomplete(lazy).pipe(
                    map((data) => fromProductListActions.autocompleteSearchSuccess({data})),
                    catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                )
            )
        )
    );

    autocompleteSearchSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(fromProductListActions.autocompleteSearchSuccess), // Escucha la acción
                tap(({data}) => {
                    console.log(data.content);
                    // Actualiza el BehaviorSubject en el servicio
                    this.productService.updateAutocomplete(data.content);
                })
            ),
        {dispatch: false} // No despacha una nueva acción
    );


    uploadImage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.uploadImage),
            switchMap(({files, id}) =>
                this.service.uploadImage(files, id).pipe(
                    map((data) => fromProductListActions.uploadImageSuccess(),
                        catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                    )
                )
            )
        )
    );

    loadProductAdditional$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.loadProductAdditional),
            switchMap(({lazy}) =>
                this.service.findAllPaginateFilter(lazy).pipe(
                    map((data) => fromProductListActions.loadProductAdditionalSuccess({data})),
                    catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                )
            )
        )
    );

    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.createProduct),
            switchMap(({entity}) =>
                this.service.create(entity).pipe(
                    map((data) => fromProductListActions.createProductSuccess({entity: data})),
                    catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                )
            )
        )
    );
    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.updateProduct),
            switchMap(({entity}) =>
                this.service.update(entity, 'id').pipe(
                    map((data) => fromProductListActions.updateProductSuccess({entity: entity})),
                    catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                )
            )
        )
    );
    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.deleteProduct),
            switchMap(({id}) =>
                this.service.delete(id).pipe(
                    map(() => fromProductListActions.deleteProductSuccess({id})),
                    catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                )
            )
        )
    );

    getById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProductListActions.getByID),
            switchMap(({id}) =>
                this.service.findOneById(id).pipe(
                    map((data) => fromProductListActions.getByIDSuccess({entity: data})),
                    catchError(error => of(fromProductListActions.ProductListFailRequest({error})))
                )
            )
        )
    );

    constructor(private actions$: Actions,
                private productService: ProductService,
                private service: ProductServices) {
    }
}
