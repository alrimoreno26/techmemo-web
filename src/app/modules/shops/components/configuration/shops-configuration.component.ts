import {ChangeDetectorRef, Component, effect, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressDTO} from "../../../../core/models/supplier";
import {CepValidateService} from "../../../../core/services/cep-validate.service";
import {Subscription, takeUntil} from "rxjs";
import {ShopsService} from "../../service/shops.service";
import {Router} from "@angular/router";
import {CNPJService} from "../../../../core/services/cnpj-validate.service";
import {SelectItemGroup} from "primeng/api";
import {CommercesService} from "../../service/commerces.service";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {CommerceDto, PrinterDto} from "../../../../core/models/commerce";
import {MAddPrintersComponent} from "./components/m-add-printers/m-add-printers.component";
import {PrintersService} from "../../service/printers.service";
import {confirmDialog} from "../../../../core/rx/confirm";
import {ConfirmServices} from "../../../../core/injects/confirm.services";
import {CashRegisterService} from "../../service/cash-register.service";
import {MAddCaixasComponent} from "./components/m-add-caixa/m-add-caixas.component";
import {SessionServices} from "../../../../core/injects/session.services";
import {DialogRegistryService} from "../../../../core/injects/dialog.registry.services";
import {MAddBanksComponent} from "./components/m-add-banks/m-add-banks.component";
import {BanksService} from "../../service/banks.service";
import {BrazilActiveBanks} from "../../../../core/util";

@Component({
    selector: 'c-shops-configuration',
    templateUrl: './shops-configuration.component.html',
    styleUrls: ['./shops-configuration.component.scss']
})
export class ShopsConfigurationComponent extends BaseComponentDirective implements OnInit {

    override modalContent = MAddPrintersComponent;
    enableQuantity: boolean
    searchingCEP: boolean = false;
    protected subscriptions: Subscription[] = [];
    nome = 'alejandro';
    form: FormGroup;

    items: SelectItemGroup[] = []
    selectedItems: any = 'dados';

    searchingCNPJ: boolean = false;

    imgLogo = './assets/images/commerce/logo_default.svg';
    imgBanner = './assets/images/commerce/banner_default.jpg';

    enableView = 'dados';
    selectedStore: any;
    onlineStore: boolean = false;

    constructor(private fb: FormBuilder,
                private cepValidateService: CepValidateService,
                private cnpjService: CNPJService,
                private shopsServices: ShopsService,
                public printersServices: PrintersService,
                public cashRegisterService: CashRegisterService,
                public banksService: BanksService,
                private layout: LayoutService,
                public session: SessionServices,
                public commercesService: CommercesService,
                private confirmationService: ConfirmServices,
                private dialogRegistryService: DialogRegistryService,
                private router: Router,
                private cdRef: ChangeDetectorRef,) {
        super();
        this.commercesService.loadAll({lazy: {pageNumber: 0, pageSize: 100}})
        effect(() => {
            if (!this.commercesService.selectedEntity$()) {
                this.commercesService.getById(this.session.getCurrentStore().id);
            } else {
                this.printersServices.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                this.cashRegisterService.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                this.banksService.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                this.selectedStore = this.session.getCurrentStore();
                this.session.setCurrentStore(this.selectedStore);
                this.onlineStore = this.selectedStore.hasOnlineCommerce;

                this.changeVisualsCommerce();
                this.initForm()
            }
        });

    }

    setNewCommerce() {
        this.session.setTenantId(this.selectedStore.id)
        this.commercesService.getById(this.selectedStore.id)
    }

    changeVisualsCommerce() {

        let userConfig = {
            ripple: true,
            colorScheme: this.selectedStore.config ? this.selectedStore.config.colorSchemeType.toLowerCase() : 'light',
            menuMode: this.selectedStore.config ? this.selectedStore.config.menuType.toLowerCase() : 'slim',
            menuTheme: this.selectedStore.config ? this.selectedStore.config.componentTheme : 'darkgray',
            scale: this.selectedStore.config ? this.selectedStore.config.scale : 14,
            inputStyle: 'outlined',
            theme: this.selectedStore.config ? this.selectedStore.config.theme : 'blue',
        };

        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const newHref = themeLink.getAttribute('href')!.replace(this.layout.config.theme, userConfig.theme);

        const id = 'theme-link';
        const targetLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>targetLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', newHref);
        cloneLinkElement.setAttribute('id', id + '-clone');

        targetLink.parentNode!.insertBefore(cloneLinkElement, targetLink.nextSibling);
        cloneLinkElement.setAttribute('id', id);
        targetLink.remove();

        this.layout.onConfigUpdate();


        this.layout.userConfigVisuals(userConfig);
    }

    ngOnInit() {
        this.session.actualStore$.subscribe((store: any) => {
            if (this.selectedStore && this.selectedStore.id !== store.id) {
                this.selectedStore = this.commercesService.listEntities$().find((x: any) => x.id === store.id);
                this.commercesService.setSelected(this.selectedStore);
                this.session.setCurrentStore(this.selectedStore);
                this.onlineStore = this.selectedStore.hasOnlineCommerce;

                this.changeVisualsCommerce();
                this.initForm()
            }
        })
        this.initForm()
        this.form.get('quantityTables')?.valueChanges.subscribe(() => {
            this.enableQuantity = true;
        })
        this.items = [
            {
                label: 'Configurações da Loja',
                value: 'dados',
                items: [
                    {
                        label: 'Dados gerais ',
                        value: 'dados',
                        icon: 'mdi mdi-store-cog-outline mdi-24px',

                    },
                ]
            },
            {
                label: 'Contas Correntes',
                value: 'bancos',
                items: [
                    {
                        label: 'Bancos',
                        value: 'bank',
                        icon: 'mdi mdi-bank-plus mdi-24px',

                    },
                ]
            },
            {
                label: 'Informações e design',
                value: 'visuals',
                items: [
                    {
                        label: 'Configurações visuais',
                        value: 'visual',
                        icon: 'mdi mdi-brush-outline mdi-24px',


                    }
                ]
            },
            {
                label: 'Dispositivos',
                value: 'devices',
                items: [
                    {
                        label: 'Impressora',
                        value: 'printers',
                        icon: 'mdi mdi-printer-pos-cog-outline mdi-24px',
                    },
                    {
                        label: 'Caixas',
                        value: 'caixa',
                        icon: 'mdi mdi-cash-register mdi-24px',
                    }
                ]
            },
        ];
    }

    initForm() {
        this.form = new FormGroup({
            address: this.fb.group({
                cep: new FormControl<string>(this.selectedStore?.address?.cep, Validators.required),
                city: [{value: this.selectedStore?.address?.city, disabled: true}, Validators.required],
                complement: [this.selectedStore?.address?.complement],
                neighborhood: [{value: this.selectedStore?.address?.neighborhood, disabled: true}, Validators.required],
                number: [this.selectedStore?.address?.number],
                street: [{value: this.selectedStore?.address?.street, disabled: true}, Validators.required],
                uf: [{value: this.selectedStore?.address?.uf, disabled: true}, Validators.required],
            }),
            document: new FormControl<string>({value: this.selectedStore?.cnpj, disabled: true}, Validators.required),
            name: new FormControl<string>(this.selectedStore?.name, Validators.required),
            enable: new FormControl<string>(this.selectedStore?.enable, Validators.required),
            hasOnlineCommerce: new FormControl<string>(this.selectedStore?.hasOnlineCommerce, Validators.required),
            socialReason: new FormControl<string>({
                value: this.selectedStore?.socialReason,
                disabled: true
            }, Validators.required),
            quantityTables: new FormControl<number>(this.selectedStore?.amountTables),
            amountOrders: new FormControl<number>(this.selectedStore?.amountOrders),
        })
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

    saveDataBySection() {
        switch (this.selectedItems) {
            case 'dados':
                this.saveDados()
                break;
            case 'visual':
                this.saveVisuals();
                break;
            case 'printers':
                break
        }
    }

    addEditPrintersCashRegister(param: any, type: 'CAIXA' | 'POS') {
        let dialogRef;
        if (type === "CAIXA") {
            this.printersServices.openModalAddOrEdit();
            dialogRef = this.dialogService.open(MAddPrintersComponent, {
                data: param,
                width: '350px',
            });
            this.dialogRegistryService.addDialog(dialogRef);
        } else {
            this.cashRegisterService.openModalAddOrEdit();
            dialogRef = this.dialogService.open(MAddCaixasComponent, {
                data: param,
                width: '350px',
            })
            this.dialogRegistryService.addDialog(dialogRef);
        }
    }

    addEditContaCorrente(param: any) {
        let dialogRef;
        this.banksService.openModalAddOrEdit();
        dialogRef = this.dialogService.open(MAddBanksComponent, {
            data: param,
            width: '350px',
        })
        this.dialogRegistryService.addDialog(dialogRef);
    }

    patchEnable(event: any, item: PrinterDto) {
        this.printersServices.update({data: {id: item.id, enabled: event.checked}});
    }

    patchCaixaEnable(event: any, item: any) {
        this.cashRegisterService.update({data: {id: item.id, enabled: event.checked}});
    }

    saveVisuals() {
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
        this.commercesService.update({data: updatedTO});
    }

    saveDados() {
        let updatedTO: CommerceDto = {
            id: this.commercesService.selectedEntity$().id,
            name: this.form.get('name')?.value,
            amountTables: this.form.get('quantityTables')?.value,
            amountOrders: this.form.get('amountOrders')?.value,
            initValueOrderCode: this.form.get('initValueOrderCode')?.value,
            hasOnlineCommerce: this.form.get('hasOnlineCommerce')?.value,
            enable: this.form.get('hasOnlineCommerce')?.value,
            address: {
                cep: (this.form.get('address') as FormGroup).get('cep')?.value,
                complement: (this.form.get('address') as FormGroup).get('complement')?.value,
                number: (this.form.get('address') as FormGroup).get('number')?.value,
                city: (this.form.get('address') as FormGroup).get('city')?.value,
                neighborhood: (this.form.get('address') as FormGroup).get('neighborhood')?.value,
                street: (this.form.get('address') as FormGroup).get('street')?.value,
                uf: (this.form.get('address') as FormGroup).get('uf')?.value
            }
        };
        let data = this.isAddressEmpty(updatedTO);
        this.commercesService.update({data: data});
    }

    isAddressEmpty(updatedTO: CommerceDto): any {
        const address = updatedTO.address;

        const isEmpty = address && Object.values(address).every(value => value === null || value === undefined);

        if (isEmpty) {
            delete updatedTO.address;
        }

        return updatedTO;
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

    deletePrinter(id: string) {
        this.confirmationService.confirm(
            'security.user.messages.confirmation',
            'security.user.messages.message'
        ).pipe(
            takeUntil(this.ngUnsubscribe),
            confirmDialog(() => this.printersServices.delete({id}))
        ).subscribe();
    }

    deleteCashRegister(id: string) {
        this.confirmationService.confirm(
            'security.user.messages.confirmation',
            'security.user.messages.message'
        ).pipe(
            takeUntil(this.ngUnsubscribe),
            confirmDialog(() => this.cashRegisterService.delete({id}))
        ).subscribe();
    }

    deleteContaCorrente(id: string) {
        this.confirmationService.confirm(
            'security.user.messages.confirmation',
            'security.user.messages.message'
        ).pipe(
            takeUntil(this.ngUnsubscribe),
            confirmDialog(() => this.banksService.delete({id}))
        ).subscribe();
    }

    getDataBanks(bank: any, type: 'IMAGE' | 'NAME') {
        const select = BrazilActiveBanks.find(x => x.COMPE === bank.bank);
        if (type === 'NAME') {
            return select.ShortName
        } else {
            return select.Icon
        }

    }


}
