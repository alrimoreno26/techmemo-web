import {Component, effect, OnInit} from "@angular/core";
import {BaseModalStoreComponentDirective} from "../../../../../../core/directives/base.modal.store.component.directive";
import {SessionServices} from "../../../../../../core/injects/session.services";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountValidateService} from "../../../../../../core/injects/offer-operation-bank-account-validate.service";
import {BrazilActiveBanks} from "../../../../../../core/util";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogRegistryService} from "../../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-add-banks',
    templateUrl: './m-add-banks.component.html',
    styles: [`
        ::ng-deep .p-dialog .p-dialog-content {
            height: auto;
            overflow: hidden;
        }
    `]
})
export class MAddBanksComponent implements OnInit {

    public brazilActiveBanks: any[] = BrazilActiveBanks;

    bankActual: any;
    banks: any;
    form: FormGroup

    banksMask: any[] = [
        {compe: "001", agencyMask: "9999-9", accountMask: "99999999-9"},
        {compe: "033", agencyMask: "9999", accountMask: "99999999-9"},
        {compe: "077", agencyMask: "9999", accountMask: "9999999-9"},
        {compe: "104", agencyMask: "9999", accountMask: "99999999999-9"},
        {compe: "237", agencyMask: "9999-*", accountMask: "9999999-*"},
        {compe: "260", agencyMask: "9999", accountMask: "9999999-9"},
        {compe: "341", agencyMask: "9999", accountMask: "99999-9"},
        {compe: "745", agencyMask: "9999", accountMask: "9999999999-9"}
    ];

    accountType: any[] = [
        {code: "CC", name: "Conta Corrente"},
        {code: "CD", name: "Conta de Depósito"},
        {code: "PG", name: "Conta Pagamento"},
        {code: "PP", name: "Conta Poupança"},
    ]

    agencyNumberMask: string;
    accountNumberMask: string;
    bankCountValid: boolean = false;

    constructor(private sessionService: SessionServices,
                private accountValidationService: AccountValidateService,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                private dialogRegistryService: DialogRegistryService) {
        effect(() => {
            // if (!this.service.dialog$()) {
            //     this.dialogRegistryService.removeDialog(this.ref);
            //     this.ref.close();
            // }
        });
    }

    ngOnInit() {
        const data = this.config.data
        this.form = new FormGroup({
            accountNumber: new FormControl<string>(data?.accountNumber, [Validators.required]),
            accountType: new FormControl<string>(data?.accountType, [Validators.required]),
            bankBranch: new FormControl<string>(data?.bankBranch, [Validators.required]),
            codeIspb: new FormControl<string>({value: '', disabled: true}, [Validators.required]),
            paymentAccountNumber: new FormControl<string>(data?.paymentAccountNumber, [Validators.required]),
        });
    }

    onChangeBank(event: any): void {
        this.bankActual = event.value;
        const bankMask: any[] = this.banksMask.filter(
            (value) => value.compe === this.bankActual
        );
        this.agencyNumberMask = bankMask[0]?.agencyMask;
        this.accountNumberMask = bankMask[0]?.accountMask;
        const isbp = this.brazilActiveBanks.find(f => f.COMPE === this.bankActual).ISPB;
        this.form.get('codeIspb')?.setValue(isbp);
    }

    verifyBankCount(): void {
        const bankCount: string = this.form.get('agencyNumber')?.value + ' ' + this.form.get('accountNumber')?.value;

        if (this.form.valid && bankCount.indexOf("_") === -1) {
            const bankAgency = bankCount.split(' ')[0].split('-')[0];
            const agencyDigit = bankCount.split(' ')[0].split('-')[1];
            const accountNumber = bankCount.split(' ')[1].split('-')[0];
            const accountDigit = bankCount.split(' ')[1].split('-')[1];

            switch (this.bankActual.COMPE) {
                case '001':
                    //BRASIL
                    if (this.accountValidationService.calculateAgencyBrasil(bankAgency) === agencyDigit &&
                        this.accountValidationService.calculateAccountBrasil(accountNumber) === accountDigit) {
                        this.bankCountValid = true;
                    }
                    break;
                case '033':
                    //SANTANDER
                    if (this.accountValidationService.calculateSantander(bankAgency, accountNumber, accountDigit)) {
                        this.bankCountValid = true;
                    }
                    break;
                case '041':
                    //BANRISUL
                    /*if (this.calculateBanrisul(accountNumber) === accountDigit) {
                      this.bankCountValid = true;
                    }*/
                    break;
                case '104':
                    //CAIXA
                    if (this.accountValidationService.calculateCaixa(bankAgency, accountNumber, accountDigit)) {
                        this.bankCountValid = true;
                    }
                    break;
                case '237':
                    //BRADESCO
                    if (this.accountValidationService.calculateAgencyBradesco(bankAgency) === agencyDigit &&
                        this.accountValidationService.calculateAccountBradesco(accountNumber) === accountDigit) {
                        this.bankCountValid = true;
                    }
                    break;
                case '341':
                    //ITAU
                    if (this.accountValidationService.calculateItau(bankAgency, accountNumber) === Number(accountDigit)) {
                        this.bankCountValid = true;
                    }
                    break;
                case '399':
                    //HSBC
                    if (this.accountValidationService.calculateHsbc(bankAgency, accountNumber, accountDigit)) {
                        this.bankCountValid = true;
                    }
                    break;
                case '745':
                    //CITY
                    if (this.accountValidationService.calculateCity(bankAgency, accountNumber, accountDigit)) {
                        this.bankCountValid = true;
                    }
                    break;
            }
        } else {
            this.bankCountValid = false;
        }
    }

    addBankData() {
        // const params: any = {
        //     ...this.form.value,
        //     active: false,
        //     codeIspb: this.form.get('codeIspb')?.value,
        //     organizationId: this.sessionService.userLogged.organization.id,
        // }
        // this.storeOrganizationsListService.postBanksAccount(params);
    }

    clearBankData() {
        this.form.reset()
    }
}
