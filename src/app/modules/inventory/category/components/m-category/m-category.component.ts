import {Component, effect, OnInit} from "@angular/core";
import {StoreCategoryService} from "../../services/store.category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryDto} from "../../../../../core/models";
import {
    BaseModalStoreComponentDirective
} from "../../../../../standalone/data-table/directives/base.modal.store.component.directive";

@Component({
    templateUrl: './m-category.component.html',
    styleUrls: ['./m-category.component.scss']
})
export class MCategoryComponent extends BaseModalStoreComponentDirective implements OnInit {

    editing: boolean = false;
    parentId: string = '';
    categories: any[] = []
    selectedCategories: any;

    subgrupoAdd: boolean = false;
    submitted: boolean = false;
    selectedSubgrupo: any = null;

    formSub: FormGroup;

    constructor(public storeCategoryService: StoreCategoryService) {
        super(storeCategoryService);
        effect(() => {
            if (this.storeCategoryService.subCategory$().length > 0) {
                this.categories = this.storeCategoryService.subCategory$();
                if(this.formSub){
                    this.formSub.reset()
                }
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
            plano: new FormControl<string>(data?.plano),
            description: new FormControl<string>(data?.description, Validators.required),
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
                ...value,
                subCategories: cat
            }
            this.service.create({data: send})
        } else {
            this.service.update({data: {id: this.config.data.id, ...value}})
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
}
