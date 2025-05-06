import {ChangeDetectorRef, Component, effect, OnInit} from "@angular/core";
import {StoreClientsService} from "../../services/store-clients.service";
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";
import {AddressDTO, supplierType} from "../../../../core/models/supplier";
import {Subscription} from "rxjs";
import {CepValidateService} from "../../../../core/services/cep-validate.service";
import {onlyDigits} from "../../../../core/util";

@Component({
    templateUrl: './m-clientes.component.html',
    styleUrls: ['./m-clientes.component.scss']
})
export class MClientesComponent extends BaseModalStoreComponentDirective implements OnInit {

    editing: boolean = false;
    searchingCEP: boolean = false;

    protected subscriptions: Subscription[] = [];

    constructor(public storeCategoryService: StoreClientsService,
                private fb: FormBuilder,
                private cdRef: ChangeDetectorRef,
                private cepValidateService: CepValidateService,
                private dialogRegistryService: DialogRegistryService,) {
        super(storeCategoryService);
        this.dialogRegistryService.addDialog(this.ref);
    }

    ngOnInit(): void {
        const {data} = this.config;

        let cep = '';

        if (data) {
            cep = data?.address?.cep.replace(/\D/g, '');
        }

        this.form = new FormGroup({
            name: new FormControl<string>(data?.name, Validators.required),
            cpf: new FormControl<string>(data?.cpf, Validators.required),
            phone: new FormControl<string>(data?.phone, Validators.required),
            address: this.fb.group({
                cep: [{value: cep}, Validators.required],
                city: [{value: data?.address?.city, disabled: true}, Validators.required],
                complement: [data?.address?.complement],
                neighborhood: [{value: data?.address?.neighborhood, disabled: true}, Validators.required],
                number: [data?.address?.number],
                street: [{value: data?.address?.street, disabled: true}, Validators.required],
                uf: [{value: data?.address?.uf, disabled: true}, Validators.required],
            }),
        });

    }

    verifyCEP(event: any): void {
        if ((this.form.get('address') as FormGroup).get('cep')?.valid) {
            const cep: string = (this.form.get('address') as FormGroup).get('cep')?.value;
            if (cep.indexOf('_') === -1) {
                const cepValue = cep.replace(/\D/g, '');
                this.searchingCEP = true;
                this.subscriptions.push(
                    this.cepValidateService.findCEP(cepValue).subscribe({
                        next: (cepInformation: any) => {
                            this.fillCepInformation(cepInformation);
                            this.searchingCEP = false;
                        },
                        error: () => console.log('error cep')
                    })
                );
            }
        }
    }

    fillCepInformation(cepInformation: any) {
        const address: AddressDTO = {
            cep: (this.form.get('address') as FormGroup).get('cep')?.value,
            complement: (this.form.get('address') as FormGroup).get('complement')?.value,
            number: (this.form.get('address') as FormGroup).get('number')?.value,
            city: cepInformation.localidade,
            neighborhood: cepInformation.bairro,
            street: cepInformation.logradouro,
            uf: cepInformation.uf
        }
        this.form.get('address')?.patchValue(address);
        this.cdRef.detectChanges();
    }
    override save(): void {
        const value: any = this.form.value;
        value.cpf = onlyDigits(this.form.get('cpf')?.value)
        value.phone = onlyDigits(this.form.get('phone')?.value);
        value.name = this.form.get('name')?.value;
        value.address = {
            cep: (this.form.get('address') as FormGroup).get('cep')?.value,
            complement: (this.form.get('address') as FormGroup).get('complement')?.value,
            number: (this.form.get('address') as FormGroup).get('number')?.value,
            city: (this.form.get('address') as FormGroup).get('city')?.value,
            neighborhood: (this.form.get('address') as FormGroup).get('neighborhood')?.value,
            street: (this.form.get('address') as FormGroup).get('street')?.value,
            uf: (this.form.get('address') as FormGroup).get('uf')?.value
        };

        debugger
        !this.config.data ?
            this.service.create({data: value}) :
            this.service.update({data: {id: this.config.data.id, ...value}});
    }


}
