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
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";
import {takeUntil} from "rxjs";
import {confirmDialog} from "../../../../../core/rx/confirm";
import {ConfirmServices} from "../../../../../core/injects/confirm.services";
import {Table} from "primeng/table";

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

    constructor(public productService: ProductService,
                private dialogService: DialogService,
                public unitService: UnidadeService,
                public categoryService: StoreCategoryService,
                private dialogRegistryService: DialogRegistryService,
                private confirmationService: ConfirmServices,
                public supplierService: SupplierService) {
        super(productService);
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            if (this.productService.selectedEntity$() !== undefined) {
                this.selectedEntity = this.service.selectedEntity$();
                this.form.reset()
                this.initForm(this.selectedEntity);
            }

            this.products = cloneDeep(this.productService.additionals$());
            if (this.selectedEntity?.additionalProducts?.length > 0) {
                this.fillSelected(this.selectedEntity)
            }


        })
        effect(() => {
            if (this.productService.selectedEntity$() !== undefined) {
                this.selectedEntity = this.service.selectedEntity$();
                this.initForm(this.selectedEntity);
            }
        });
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.initForm(data);
    }

    filtersTable(event: { target: { value: string; } } | any, dt: Table): void {
        const {value} = event.target;
        dt.filterGlobal(value, 'contains');
    }

    close() {
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
                    id: p.productId,
                    name: p.productName,
                    unitMeasurementName: p.unitMeasurementName
                })
            })
        }
        this.form = new FormGroup({
            allowsAdditional: new FormControl<boolean>(data?.allowsAdditional),
            barCode: new FormControl<string>(data?.barCode),
            categoryId: new FormControl<string>(data?.category?.id, [Validators.required]),
            cfop: new FormControl<string>(data?.cfop, Validators.required),
            code: new FormControl<string>(data?.code),
            costPrice: new FormControl<number>({
                value: data?.costPrice,
                disabled: false
            }),
            cst: new FormControl<number>(data?.cst, [Validators.required]),
            description: new FormControl<string>(data?.description),
            enabled: new FormControl<boolean>(data?.enabled),
            allowsFlavors: new FormControl<boolean>(data?.allowsFlavors),
            name: new FormControl<string>(data?.name, [Validators.required]),
            ncm: new FormControl<number>(data?.ncm, [Validators.required]),
            quantityStockAlert: new FormControl<number>(data?.quantityStockAlert),
            quantityInPackaging: new FormControl<number>(data?.quantityInPackaging === null ? 1 : data?.quantityInPackaging),
            stockAmount: new FormControl<number>(data?.stockAmount),
            salePrice: new FormControl<number>({
                value: data?.salePrice,
                disabled: false
            }, [Validators.required]),
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

    removeAdditional(item: any) {
        const index = this.technicalSheetProducts.findIndex(
            product => product.id === item.id
        );
        if (index > -1) {
            this.technicalSheetProducts.splice(index, 1);
        }
    }

    supplier(id: string) {
        // @ts-ignore
        return this.supplierService.listEntities$().find(s => s.id === id);
    }

    removeImage(file: Image) {
        //this.product.images = this.product.images.filter(i => i !== file);
    }

    override save(): void {

        const value = this.form.value;
        const costPrice = this.form.get('costPrice')?.value;
        const salePrice = this.form.get('salePrice')?.value;

        const additionalProducts =
            this.typeProduct === productType.COMBO
                ? this.selectedAdditional.map((ad: any) => ({id: ad.id, amount: ad.amount}))
                : [];

        const send = {
            ...value,
            additionalProducts,
            costPrice,
            salePrice,
            type: this.typeProduct,
            technicalSheetProducts: this.typeProduct === productType.SIMPLE ? this.technicalSheetProducts : [],
        };

        const executeServiceCall = () =>
            Object.keys(this.selectedEntity).length === 0
                ? this.service.create(send)
                : this.service.update({id: this.config.data.id, ...send});

        if (!costPrice) {
            this.confirmationService
                .confirm('security.user.messages.confirmation', 'security.products.confirm')
                .pipe(
                    takeUntil(this.ngUnsubscribe),
                    confirmDialog(() => executeServiceCall())
                )
                .subscribe();
        } else {
            executeServiceCall();
        }
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
            console.log(values)
            this.form.get('salePrice')?.setValue(isNaN(values.totalUnitPrice) ? 0 : values.totalUnitPrice);
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
        if (item === undefined)
            return []
        return item;
    }

    addFornecedor() {
        this.supplierService.openModalAddOrEdit();
        this.dialogService.open(MFornecedoresComponent, {});
    }

    protected readonly productType = productType;
}
