import {Component, effect, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {CNPJService} from "../../../../../../core/services/cnpj-validate.service";
import {CommerceTypeEnum} from "../../../../../../core/enums/commerce";
import {UserService} from "../../../../../security/user/services/user.service";
import {CommercesService} from "../../../../service/commerces.service";
import {operationAreaRoleEnum} from "../../../../../../core/enums/role";
import {
    BaseModalStoreComponentDirective
} from "../../../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {DialogRegistryService} from "../../../../../../core/injects/dialog.registry.services";
import {SelectItemGroup} from "primeng/api";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
    selector: 'm-add-commerce',
    templateUrl: './m-add-commerce.component.html',
    styles: [`
        .icon-spinner {
            animation: spin-animation 1.5s infinite;
            display: inline-block;
        }

        @keyframes spin-animation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(359deg);
            }
        }`]
})
export class MAddCommerceComponent extends BaseModalStoreComponentDirective implements OnInit {

    searchingCNPJ: boolean = false;
    protected subscriptions: Subscription[] = [];

    selectedCommerces: any;

    filteredGroups: any[] = [];

    groupedCommerces: SelectItemGroup[] = [];

    commerceTypeEnum: any[] = [
        {label: 'Loja', value: CommerceTypeEnum.SUBSIDIARY},
        {label: 'Matriz', value: CommerceTypeEnum.PARENT},
        {label: 'Fabrica', value: CommerceTypeEnum.INDUSTRY}
    ];

    listUser: any[] = [];

    constructor(private cnpjService: CNPJService,
                private commercesService: CommercesService,
                public userService: UserService,
                private dialogRegistryService: DialogRegistryService) {
        super(commercesService)
        this.dialogRegistryService.removeDialog(this.ref);
        this.userService.loadBasic({pageSize: 10, pageNumber: 0})
        effect(() => {
            this.userService.userBasic$.subscribe(user => {
                this.listUser = user.filter((u: any) => u.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE || u.operationArea === operationAreaRoleEnum.FACTORY_ADMINISTRATOR) ?? [];
            })
        });
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            cnpj: new FormControl<string>('', Validators.required),
            name: new FormControl<string>('', Validators.required),
            socialReason: new FormControl<string>({
                value: '',
                disabled: true
            }, Validators.required),
            type: new FormControl<any>(CommerceTypeEnum.SUBSIDIARY),
            userId: new FormControl<any>('', Validators.required),
            populateInitialData: new FormControl<boolean>(false),
            parentCommerceId: new FormControl<string>(''),
        });
        this.constructGroupedDropdown();
    }

    getForm(val: string): string {
        return this.form.get(val)?.value;
    }


    verifyCNPJ(event: any): void {
        const cnpj: string = event.target.value.replace(/\D/g, '');
        if (cnpj.length === 14) {
            this.searchingCNPJ = true;
            this.subscriptions.push(
                this.cnpjService.findCNPJ(cnpj.replace(/\D/g, '')).subscribe({
                    next: (cnpjInformation: any) => {
                        this.searchingCNPJ = false;
                        this.fillCNPJInformation(cnpjInformation);
                    },
                    error: () => console.log('error cnpj')
                })
            );
        }
    }

    onChangeCommerceType(event: any) {
        switch (event.value) {
            // case CommerceTypeEnum.SUBSIDIARY:
            //     this.listUser = (this.userService.listEntities$()?.filter((u: any) => u.role?.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE) ?? []);
            //     this.constructGroupedDropdown();
            //     break
            // case CommerceTypeEnum.PARENT:
            //     this.listUser = (this.userService.listEntities$()?.filter((u: any) => u.role?.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE) ?? []);
            //     this.constructGroupedDropdown();
            //     break
            // case CommerceTypeEnum.INDUSTRY:
            //     this.listUser = (this.userService.listEntities$()?.filter((u: any) => u.role?.operationArea === operationAreaRoleEnum.FACTORY_ADMINISTRATOR) ?? []);
            //     break
        }
    }

    constructGroupedDropdown() {
        const type = this.form.get('type')?.value;
        const entities = this.commercesService.listEntities$();

        const industries = entities.filter(x => x.type === CommerceTypeEnum.INDUSTRY).map(f => ({
            value: f.id,
            label: f.socialReason
        }));

        const commerces = entities.filter(x => x.type === CommerceTypeEnum.PARENT).map(f => ({
            value: f.id,
            label: f.socialReason
        }));

        this.groupedCommerces = [];

        if (type === CommerceTypeEnum.INDUSTRY) {
            // No grouping needed for INDUSTRY type
            return;
        }

        if (type === CommerceTypeEnum.PARENT && commerces.length > 0) {
            this.groupedCommerces.push({
                label: 'Lojas',
                value: CommerceTypeEnum.PARENT,
                items: commerces
            });
        }

        if (type !== CommerceTypeEnum.INDUSTRY) {
            if (industries.length > 0) {
                this.groupedCommerces.push({
                    label: 'Fabricas',
                    value: CommerceTypeEnum.INDUSTRY,
                    items: industries
                });
            }

            if (commerces.length > 0) {
                this.groupedCommerces.push({
                    label: 'Lojas',
                    value: CommerceTypeEnum.PARENT,
                    items: commerces
                });
            }
        }
    }

    fillCNPJInformation(cnpjInformation: any) {
        this.form.get('name')?.patchValue(cnpjInformation.nome_fantasia);
        this.form.get('socialReason')?.patchValue(cnpjInformation.razao_social);
    }

    override save() {
        if (this.form.valid) {
            if (this.form.valid) {
                const send = {
                    ...this.form.value,
                    socialReason: this.form.get('socialReason')?.value
                }
                let data = Object.fromEntries(
                    Object.entries(send).filter(([key, value]) => value !== null && value !== undefined)
                );
                this.commercesService.create({data: data})
            }
        }
    }

    protected readonly CommerceTypeEnum = CommerceTypeEnum;
}
