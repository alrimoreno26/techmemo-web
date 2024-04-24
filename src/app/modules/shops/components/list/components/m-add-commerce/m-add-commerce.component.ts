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
    selectedUser: any;
    commerceTypeEnum: any[] = [
        {label: 'Loja', value: CommerceTypeEnum.SUBSIDIARY},
        {label: 'Matriz', value: CommerceTypeEnum.PARENT},
        {label: 'Fabrica', value: CommerceTypeEnum.INDUSTRY}
    ];

    listUser: any[] = [];

    constructor(private cnpjService: CNPJService,
                private commercesService: CommercesService,
                public userService: UserService) {
        super(commercesService)
        this.userService.loadBasic({pageSize: 10, pageNumber: 0})
        effect(() => {
            this.userService.userBasic$.subscribe(user => {
                this.listUser = user.filter((u: any) => u.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE) ?? [];
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
        });
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
            case CommerceTypeEnum.SUBSIDIARY:
                this.listUser = (this.userService.listEntities$()?.filter((u: any) => u.role?.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE) ?? []);
                break
            case CommerceTypeEnum.PARENT:
                this.listUser = (this.userService.listEntities$()?.filter((u: any) => u.role?.operationArea === operationAreaRoleEnum.ADMINISTRATOR_STORE) ?? []);
                break
            case CommerceTypeEnum.INDUSTRY:
                this.listUser = (this.userService.listEntities$()?.filter((u: any) => u.role?.operationArea === operationAreaRoleEnum.FACTORY_ADMINISTRATOR) ?? []);
                break
        }
    }

    fillCNPJInformation(cnpjInformation: any) {
        this.form.get('name')?.patchValue(cnpjInformation.nome_fantasia);
        this.form.get('socialReason')?.patchValue(cnpjInformation.razao_social);
    }

    override save() {
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
