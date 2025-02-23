import {Component, effect, OnInit} from "@angular/core";
import {StoreCategoryService} from "../../services/store.category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryDto} from "../../../../../core/models";
import {
    BaseModalStoreComponentDirective
} from "../../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {FinancialClasificationService} from "../../../../financial/service/financial-clasification.service";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";
import {UploadEvent} from "primeng/fileupload";

@Component({
    templateUrl: './m-category.component.html',
    styleUrls: ['./m-category.component.scss']
})
export class MCategoryComponent extends BaseModalStoreComponentDirective implements OnInit {

    editing: boolean = false;
    parentId: string = '';
    categories: any[] = []
    showCategories: boolean = false;
    selectedCategories: any;

    subgrupoAdd: boolean = false;
    submitted: boolean = false;
    selectedSubgrupo: any = null;

    formSub: FormGroup;

    constructor(public storeCategoryService: StoreCategoryService,
                private dialogRegistryService: DialogRegistryService,
                public financialClasificationService: FinancialClasificationService) {
        super(storeCategoryService);
        this.dialogRegistryService.addDialog(this.ref);
        this.financialClasificationService.loadLight({pageNumber: 0, pageSize: 1000})
        effect(() => {
            console.log(storeCategoryService.selectedEntity$())
            if (this.storeCategoryService.subCategory$()) {
                this.showCategories = true
                this.categories = this.storeCategoryService.subCategory$();
                if (this.formSub) {
                    this.formSub.reset()
                }
            } else {
                this.showCategories = false
            }
            if (this.financialClasificationService.lightEntities$().length > 0 && this.editing) {
                const classifier = this.financialClasificationService.listEntities$().find((f: any) => f.id === this.form.get('classifier')?.value.id);
                if (classifier)
                    this.form.get('classifier')?.patchValue(classifier)
            }
        });
    }

    ngOnInit(): void {
        const {data} = this.config;
        if (this.config.data) {
            this.editing = true;
        }
        this.form = new FormGroup({
            name: new FormControl<string>(data?.name, Validators.required),
            classifier: new FormControl<string>(data?.classifier),
            description: new FormControl<string>(data?.description),
        });
        this.formSub = new FormGroup({
            name: new FormControl<string>('', Validators.required),
            description: new FormControl<string>(''),
        });
    }

    hideDialog() {
        this.formSub.reset()
        this.submitted = false;
        this.subgrupoAdd = false;
    }

    saveFields() {
        if (this.editing) {
            const sub = [this.formSub.value]
            if (this.selectedSubgrupo) {
                this.storeCategoryService.updateSubCategory(this.selectedSubgrupo.id, this.formSub.value)
            } else {
                this.storeCategoryService.createSubCategory(this.config.data.id, sub);
            }
        } else {
            this.submitted = false;

        }
    }

    override save(): void {
        const value: any = this.form.value;
        if (!this.config.data) {
            const cat: CategoryDto[] = [];
            this.categories.forEach((c) => {
                cat.push({
                    name: c.name,
                    description: c.description
                })
            })
            const send = {
                name: this.form.get('name')?.value,
                description: this.form.get('description')?.value,
                classifierId: this.form.get('classifier')?.value.id,
                subCategories: cat,
            }
            this.service.create({data: send})
        } else {
            const create = {
                name: this.form.get('name')?.value,
                description: this.form.get('description')?.value,
                classifierId: this.form.get('classifier')?.value.id,
            }
            this.service.update({data: {id: this.config.data.id, ...create}})
        }
    }

    close() {
        this.storeCategoryService.closeModal();
    }

    novoSubgrupo() {
        this.subgrupoAdd = true;
    }

    editItem(item: any) {
        this.subgrupoAdd = true;
        this.formSub.get('name')?.setValue(item.name);
        this.formSub.get('description')?.setValue(item.description);
        this.selectedSubgrupo = item;
    }

    deleteItem(item: CategoryDto) {
        const params = this.categories.filter((el: CategoryDto) => {
            el?.id !== item?.id
        })
        this.storeCategoryService.updateSubCategory(this.config.data.id, params)
    }

    protected readonly event = event;
}
