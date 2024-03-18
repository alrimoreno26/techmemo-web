import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressDTO} from "../../../core/models/supplier";
import {CepValidateService} from "../../../core/services/cep-validate.service";
import {Subscription} from "rxjs";
import {ShopsService} from "../service/shops.service";
import {HttpClient} from "@angular/common/http";
import * as XLSX from "xlsx";
import {productType} from "../../../core/enums/product";
import {ProductService} from "../../inventory/product/services/product.service";
import {Router} from "@angular/router";
import {CNPJService} from "../../../core/services/cnpj-validate.service";

@Component({
    selector: 'c-shops-configuration',
    templateUrl: './shops-configuration.component.html',
    styleUrls: ['./shops-configuration.component.scss']
})
export class ShopsConfigurationComponent extends BaseComponentDirective implements OnInit {

    enableQuantity: boolean
    searchingCEP: boolean = false;
    protected subscriptions: Subscription[] = [];
    nome = 'alejandro';
    form: FormGroup;

    searchingCNPJ: boolean = false;

    constructor(private fb: FormBuilder,
                private cepValidateService: CepValidateService,
                private cnpjService: CNPJService,
                private shopsServices: ShopsService,
                private router: Router,
                private cdRef: ChangeDetectorRef,) {
        super();
    }

    ngOnInit() {
        this.form = new FormGroup({
            address: this.fb.group({
                cep: ['', Validators.required],
                city: [{value: '', disabled: true}, Validators.required],
                complement: [''],
                neighborhood: [{value: '', disabled: true}, Validators.required],
                number: [''],
                street: [{value: '', disabled: true}, Validators.required],
                uf: [{value: '', disabled: true}, Validators.required],
            }),
            name: new FormControl<string>(''),
            document: new FormControl<string>('', Validators.required),
            socialReason: new FormControl<string>({
                value: '',
                disabled: true
            }, Validators.required),
            quantityTables: new FormControl<number>(0),
        })
        this.form.get('quantityTables')?.valueChanges.subscribe((type: any) => {
            this.enableQuantity = true;
        })
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

    configShop() {
        const params = {
            number: this.form.get('quantityTables')?.value
        }
        this.shopsServices.createTable(params);
    }


    goto() {
        this.router.navigate(['loja', this.nome]);
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
        this.form.get('fantasyName')?.patchValue(cnpjInformation.nome_fantasia);
        this.form.get('socialReason')?.patchValue(cnpjInformation.razao_social);
    }
}
