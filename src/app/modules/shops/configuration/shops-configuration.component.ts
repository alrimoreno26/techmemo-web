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

    constructor(private fb: FormBuilder,
                private cepValidateService: CepValidateService,
                private productService: ProductService,
                private http: HttpClient,
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

    importExcel() {
        const workbook = 'assets/products.xlsx';
        // Obtiene la primera hoja del archivo (puedes ajustar esto según tu caso)
        return this.http.get(workbook, {responseType: 'arraybuffer'})
            .subscribe(
                (data) => {
                    const send = this.processExcelDataProduct(data);
                    console.log(send)
                    send.forEach(x => {
                        setTimeout(() => {
                            console.log(x)
                            this.productService.create(x)
                            console.log("¡La función se ejecutó después de 2000 milisegundos (3 segundos)!");
                        }, 3000);

                    })
                },
                (error) => {
                    console.error('Error loading Excel file:', error);
                }
            );
    }

    private processExcelDataProduct(data: ArrayBuffer) {
        const workbook = XLSX.read(new Uint8Array(data), {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        let response: any[] = [];

        jsonData.forEach((el: any) => {
            response.push({
                allowsAdditional: null,
                additionalProducts: [],
                barCode: el[5].toString(),
                categoryId: el[2].toString(),
                cfop: el[7].toString(),
                code: el[7].toString(),
                costPrice: el[4],
                cst: el[8].toString(),
                description: null,
                enable: true,
                name: el[0].toString(),
                ncm: el[9].toString(),
                quantityStockAlert: 10,
                stockAmount: 300,
                salePrice: el[4],
                showInMenu: true,
                soldPerUnits: true,
                supplierIds: ['43cc42f5-dc17-401c-b49e-1e3c5af7d81e'],
                valuePerUnits: 1,
                unitMeasurementId: null,
                type: productType.SIMPLE,
            })
        })

        return response;
    }

    goto() {
        this.router.navigate(['loja', this.nome]);
    }
}
