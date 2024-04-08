import {ChangeDetectorRef, Component, effect, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressDTO} from "../../../../core/models/supplier";
import {CepValidateService} from "../../../../core/services/cep-validate.service";
import {Subscription} from "rxjs";
import {ShopsService} from "../../service/shops.service";
import {HttpClient} from "@angular/common/http";
import * as XLSX from "xlsx";
import {productType} from "../../../../core/enums/product";
import {ProductService} from "../../../inventory/product/services/product.service";
import {Router} from "@angular/router";
import {CNPJService} from "../../../../core/services/cnpj-validate.service";
import {MenuItem} from "primeng/api";
import {CommercesService} from "../../service/commerces.service";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {CommerceDto} from "../../../../core/models/commerce";

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

    items: MenuItem[] | undefined;

    searchingCNPJ: boolean = false;

    imgLogo = './assets/images/commerce/logo_default.svg';
    imgBanner = './assets/images/commerce/banner_default.jpg';

    enableView = 'visual';
    actualConfig: any = null;

    constructor(private fb: FormBuilder,
                private cepValidateService: CepValidateService,
                private cnpjService: CNPJService,
                private shopsServices: ShopsService,
                private layout: LayoutService,
                private commercesService: CommercesService,
                private router: Router,
                private cdRef: ChangeDetectorRef,) {
        super();
        effect(() => {
            if (!this.commercesService.selectedEntity$()) {
                this.commercesService.getById();
            }
        });

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


        this.items = [
            {
                label: '<span class="font-bold">Configurações da Loja</span>',
                escape: false,
                items: [
                    {
                        label: 'Dados gerais ',
                        icon: 'mdi mdi-store-cog-outline mdi-24px',
                        command: () => {
                            this.showView('dados');
                        }
                    },
                ]
            },
            {
                label: '<span class="font-bold">Informações e design</span>',
                escape: false,
                items: [
                    {
                        label: 'Configurações visuais',
                        icon: 'mdi mdi-brush-outline mdi-24px',
                        command: () => {
                            this.showView('visual');
                        }

                    }
                ]
            },

        ];
    }

    showView(type: string): void {
        this.enableView = type;
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

    saveVisuals() {
        debugger
        let updatedTO: CommerceDto = {
            id: this.commercesService.selectedEntity$().id,
            config: {
                colorSchemeType: this.layout.config.colorScheme.toUpperCase(),
                componentTheme: this.layout.config.menuTheme,
                menuType: this.layout.config.menuMode.toUpperCase(),
                scale: this.layout.config.scale,
                theme: this.layout.config.theme,
            }
        };
        debugger
        this.commercesService.update({data: updatedTO});
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
