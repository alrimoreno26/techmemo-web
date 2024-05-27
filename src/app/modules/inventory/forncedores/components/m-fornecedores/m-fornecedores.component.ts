import {ChangeDetectorRef, Component, effect, OnInit} from "@angular/core";
import {
    BaseModalComponentDirective
} from "../../../../../standalone/data-table/directives/base.modal.component.directive";
import {SupplierService} from "../../services/supplier.service";
import {CepValidateService} from "../../../../../core/services/cep-validate.service";
import {Subscription} from "rxjs";
import {CNPJService} from "../../../../../core/services/cnpj-validate.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressDTO, SupplierDTO, supplierType} from "../../../../../core/models/supplier";
import {cellPhone} from "../../../../../core/validators/cell.validator";
import {onlyDigits} from "../../../../../core/util";
import {cloneDeep} from "lodash";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    templateUrl: './m-fornecedores.component.html',
    styleUrls: ['./m-fornecedores.component.scss']
})
export class MFornecedoresComponent extends BaseModalComponentDirective implements OnInit {

    protected subscriptions: Subscription[] = [];
    fornecedorTypes: any[] = [
        {label: 'Pessoa Juridaca', value: supplierType.COMPANY},
        {label: 'Pessoa Fisica', value: supplierType.PERSON}
    ];

    showCompany: boolean = true;
    searchingCNPJ: boolean = false;
    searchingCEP: boolean = false;

    products = []

    supplier: SupplierDTO;

    constructor(public fornecedoresservice: SupplierService,
                private cepValidateService: CepValidateService,
                private cdRef: ChangeDetectorRef,
                private dialogRegistryService: DialogRegistryService,
                private fb: FormBuilder,
                private cnpjService: CNPJService,) {
        super(fornecedoresservice);
        this.dialogRegistryService.addDialog(this.ref);
        effect(() => {
            if (this.fornecedoresservice.selectedEntity$() !== undefined) {
                if (Object.keys(this.service.selectedEntity$()).includes('products')) {
                    this.products = this.service.selectedEntity$().products;
                }
                this.form.reset()
                this.initForm(this.service.selectedEntity$());
            }

        })
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.initForm(data);
    }

    initForm(data: any): void {
        if (data !== undefined && Object.keys(data).includes('products')) {
            this.supplier = data;
        } else {
            this.supplier = {
                ...data,
                products: []
            };
        }

        console.log(this.supplier)
        let type = supplierType.COMPANY;
        let cep = '';

        if (data) {
            type = data?.type;
            if (type === supplierType.COMPANY) {
                this.showCompany = true

            } else {
                this.showCompany = false;
            }
            cep = data?.address?.cep.replace(/\D/g, '');

        }

        this.form = new FormGroup({
            address: this.fb.group({
                cep: [{value: cep}, Validators.required],
                city: [{value: data?.address?.city, disabled: true}, Validators.required],
                complement: [data?.address?.complement],
                neighborhood: [{value: data?.address?.neighborhood, disabled: true}, Validators.required],
                number: [data?.address?.number],
                street: [{value: data?.address?.street, disabled: true}, Validators.required],
                uf: [{value: data?.address?.uf, disabled: true}, Validators.required],
            }),
            document: new FormControl<string>(data?.document, Validators.required),
            lastName: new FormControl<string>(data?.lastName, Validators.required),
            name: new FormControl<string>({
                value: data?.name,
                disabled: true
            }, Validators.required),
            email: new FormControl<string>(data?.email, [Validators.required, Validators.email]),
            phone: new FormControl<string>(data?.phone, [Validators.required, cellPhone]),
            type: new FormControl<string>(type, Validators.required),
        });
        if (cep !== '') {
            this.updateFormBasedOnType(type);
            (this.form.get('address') as FormGroup).get('cep')?.patchValue(cep);
        }
        this.form.get('type')?.valueChanges.subscribe((type: supplierType) => {
            this.updateFormBasedOnType(type);
        })
    }

    private updateFormBasedOnType(type: supplierType): void {
        if (type === supplierType.COMPANY) {
            this.showCompany = true;
            this.form.removeControl('birthdate');
        } else if (supplierType.PERSON) {
            this.showCompany = false;
            this.form.addControl('birthdate', this.fb.control(this.config.data?.birthdate, Validators.required));
        }
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

    fillCNPJInformation(cnpjInformation: any) {
        this.form.get('lastName')?.patchValue(cnpjInformation.nome_fantasia);
        this.form.get('name')?.patchValue(cnpjInformation.razao_social);
    }

    override save(): void {
        const value: any = this.form.value;
        value.document = onlyDigits(this.form.get('document')?.value)
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

        !this.config.data ?
            this.service.create(value) :
            this.service.update({id: this.config.data.id, ...value});
    }
}
