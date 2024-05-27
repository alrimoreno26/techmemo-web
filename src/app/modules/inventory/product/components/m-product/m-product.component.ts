import {Component, effect, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
    BaseModalComponentDirective
} from "../../../../../standalone/data-table/directives/base.modal.component.directive";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UnidadeService} from "../../../../configuracion/unidade/services/unidade.service";
import {SupplierService} from "../../../forncedores/services/supplier.service";
import {StoreCategoryService} from "../../../category/services/store.category.service";
import {productType} from "../../../../../core/enums/product";
import {ProductFilterDto} from "../../../../../core/models/products";
import {cloneDeep} from "lodash";
import {CategoryDto} from "../../../../../core/models";
import {MFornecedoresComponent} from "../../../forncedores/components/m-fornecedores/m-fornecedores.component";
import {DialogService} from "primeng/dynamicdialog";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

interface Image {
    name: string;
    objectURL: string;
}

@Component({
    templateUrl: './m-product.component.html',
    styleUrls: ['./m-product.component.scss']
})
export class MProductComponent extends BaseModalComponentDirective implements OnInit {

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
    typeProduct: string = productType.SIMPLE;

    text: string = '';
    quantityStockAlert: boolean = false;

    selectedAdditional!: any[];

    products: ProductFilterDto[] = []
    technicalSheetProducts: any[] = [];
    selectedEntity: any = {};

    suggestions: any[] = [];
    searchText: string;
    selectedItem: any;

    constructor(private productService: ProductService,
                private dialogService: DialogService,
                public unitService: UnidadeService,
                public categoryService: StoreCategoryService,
                public supplierService: SupplierService) {
        super(productService);
        effect(() => {
            if (this.service.selectedEntity$() !== undefined) {
                this.selectedEntity = this.service.selectedEntity$();
                // this.form.reset()
                this.initForm(this.selectedEntity);
            }

            this.products = cloneDeep(this.productService.additionals$());
            if (this.selectedEntity?.additionalProducts?.length > 0) {
                this.fillSelected(this.selectedEntity)
            }


        })
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.initForm(data);
    }

    close(){
        this.ref.close()
    }

    fillSelected(data: any): any {
        this.selectedAdditional = []
        this.products.forEach((p: any) => {
            let search = data.additionalProducts.find((ap: any) => ap.id === p.id)
            if (search) {
                this.selectedAdditional.push(p);
            }
        })
    }

    initForm(data: any): void {
        this.typeProduct = data?.type === undefined ? productType.SIMPLE : data?.type;
        let suppliers: string[] = [];
        if (data?.suppliers?.length > 0) {
            data?.suppliers.forEach((d: any) => {
                suppliers.push(d.id);
            })
        }
        if (data?.technicalSheet?.products.length > 0) {
            data?.technicalSheet.products.forEach((p: any) => {
                this.technicalSheetProducts.push({
                    amount: p.amount,
                    id: p.product.id,
                    name: p.product.name,
                    unitMeasurementName: p.product.unitMeasurementName
                })
            })
        }
        this.form = new FormGroup({
            allowsAdditional: new FormControl<boolean>(data?.allowsAdditional),
            barCode: new FormControl<string>(data?.barCode),
            categoryId: new FormControl<string>(data?.category?.id, [Validators.required]),
            cfop: new FormControl<string>(data?.cfop, Validators.required),
            code: new FormControl<string>(data?.code, [Validators.required]),
            costPrice: new FormControl<number>({
                value: data?.costPrice,
                disabled: this.typeProduct === productType.COMBO
            }, [Validators.required]),
            cst: new FormControl<number>(data?.cst, [Validators.required]),
            description: new FormControl<string>(data?.description),
            enabled: new FormControl<boolean>(data?.enabled),
            name: new FormControl<string>(data?.name, [Validators.required]),
            ncm: new FormControl<number>(data?.ncm, [Validators.required]),
            quantityStockAlert: new FormControl<number>(data?.quantityStockAlert),
            stockAmount: new FormControl<number>(data?.stockAmount),
            salePrice: new FormControl<number>({
                value: data?.salePrice,
                disabled: this.typeProduct === productType.COMBO
            }),
            showInMenu: new FormControl<boolean>(data?.showInMenu),
            soldPerUnits: new FormControl<boolean>(data?.soldPerUnits),
            supplierIds: new FormControl<string[]>(suppliers),
            unitMeasurementId: new FormControl<string>(data?.unitMeasurement?.id),
            valuePerUnits: new FormControl<number>(data?.valuePerUnits),
        });
    }

    onUpload(event: any) {
        for (let file of event.files) {
            //this.product.images.push(file);
        }
    }

    search(event: AutoCompleteCompleteEvent) {
        if (this.productService.autocomplete$()) {
            this.suggestions = this.productService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchProducts(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.productService.autocomplete({filter: this.searchText, type: 'SIMPLE'});
    }

    addProductAutocomplete() {
        this.technicalSheetProducts.push({
            amount: 0,
            id: this.selectedItem.id,
            name: this.selectedItem.name,
            unitMeasurementId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            unitMeasurementName: this.selectedItem.unitMeasurementName
        })
        this.selectedItem = null;
    }

    supplier(id: string) {
        // @ts-ignore
        return this.supplierService.listEntities$().find(s => s.id === id);
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'flex' : null;
        })
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'none' : null;
        })
    }

    removeImage(file: Image) {
        //this.product.images = this.product.images.filter(i => i !== file);
    }

    override save(): void {
        const value: any = this.form.value;
        let additionalProducts: any[] = [];
        if (this.typeProduct === productType.COMBO) {
            this.selectedAdditional.forEach((ad: any) => {
                additionalProducts.push({
                    id: ad.id,
                    amount: ad.amount
                })
            })
        }

        const send = {
            ...value,
            additionalProducts,
            costPrice: this.form.get('costPrice')?.value,
            salePrice: this.form.get('salePrice')?.value,
            type: this.typeProduct,
            technicalSheetProducts: this.typeProduct === productType.SIMPLE ? this.technicalSheetProducts : [],
        }

        Object.keys(this.selectedEntity).length === 0 ?
            this.service.create(send) :
            this.service.update({id: this.config.data.id, ...send});
    }

    rowActions(evt: any) {
        this.modifyValuesCombo();
    }

    changeValueQuantity() {
        this.modifyValuesCombo();
    }

    modifyValuesCombo() {
        if (this.selectedAdditional.length > 0) {
            const values = this.calculateTotalPrices();
            this.form.get('salePrice')?.setValue(values.totalUnitPrice);
            this.form.get('costPrice')?.setValue(values.totalCostPrice);
        } else {
            if (this.selectedAdditional.length === 0) {
                this.form.get('salePrice')?.setValue(0);
                this.form.get('unitPrice')?.setValue(0);
            }
        }

    }

    calculateTotalPrices(): { totalUnitPrice: number; totalCostPrice: number } {

        let totalUnitPrice = 0;
        let totalCostPrice = 0;

        this.selectedAdditional.forEach(item => {
            totalUnitPrice += Number(item.amount) * item.salePrice;
        });

        totalCostPrice = this.selectedAdditional.reduce((acc, item) => acc + item.costPrice, 0);
        return {totalUnitPrice, totalCostPrice};
    }

    getValueMultiselect(item: any) {
        if(item === undefined)
            return []
        return item;
    }

    addFornecedor() {
        this.supplierService.openModalAddOrEdit();
        this.dialogService.open(MFornecedoresComponent, {});
    }

    protected readonly productType = productType;
}
