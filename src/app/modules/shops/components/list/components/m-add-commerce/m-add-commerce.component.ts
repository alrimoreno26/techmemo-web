import {Component, OnInit} from "@angular/core";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {CNPJService} from "../../../../../../core/services/cnpj-validate.service";
import {cellPhone} from "../../../../../../core/validators/cell.validator";
import {CommerceTypeEnum} from "../../../../../../core/enums/commerce";
import {supplierType} from "../../../../../../core/models/supplier";
import {UserService} from "../../../../../security/user/services/user.service";
import {CommercesService} from "../../../../service/commerces.service";

@Component({
    selector: 'm-add-commerce',
    templateUrl: './m-add-commerce.component.html',
})
export class MAddCommerceComponent implements OnInit {

    form: FormGroup;
    searchingCNPJ: boolean = false;
    protected subscriptions: Subscription[] = [];
    selectedUser: any;
    commerceTypeEnum: any[] = [
        {label: 'Loja', value: CommerceTypeEnum.SUBSIDIARY},
        {label: 'Matriz', value: CommerceTypeEnum.PARENT},
        {label: 'Fabrica', value: CommerceTypeEnum.INDUSTRY}
    ];

    constructor(public ref: DynamicDialogRef,
                private service: CommercesService,
                private cnpjService: CNPJService,
                public userService: UserService) {
        this.userService.loadAll({pageSize: 10, pageNumber: 0})
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
            userId: new FormControl<any>(''),
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

    fillCNPJInformation(cnpjInformation: any) {
        this.form.get('name')?.patchValue(cnpjInformation.nome_fantasia);
        this.form.get('socialReason')?.patchValue(cnpjInformation.razao_social);
    }

    save(){
        if(this.form.valid){
            const send = {
                ...this.form.value,
                socialReason: this.form.get('socialReason')?.value
            }
            this.service.create({data: send})
        }
    }


}
