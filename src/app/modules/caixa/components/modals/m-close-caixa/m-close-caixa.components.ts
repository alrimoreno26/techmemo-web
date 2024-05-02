import {Component, effect, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SessionServices} from "../../../../../core/injects/session.services";
import {CashRegisterOperationsService} from "../../../../shops/service/cash-register-operations.service";
import {CashRegisterService} from "../../../../shops/service/cash-register.service";
import {ChashRegisterSummaryDto} from "../../../../../core/models/commerce";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-close-caixa',
    templateUrl: './m-close-caixa.components.html'
})
export class MCloseCaixaComponents implements OnInit {

    form: FormGroup
    listUser: any[] = [];
    cashRegisterId = '';
    closingValue = 0;

    cashOperations: ChashRegisterSummaryDto | null;
    closingCaixa = false;
    titleModal = 'Fechamento de Caixa';

    constructor(public session: SessionServices,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                public cashRegisterOperations: CashRegisterOperationsService,
                public cashService: CashRegisterService, private dialogRegistryService: DialogRegistryService) {
        this.dialogRegistryService.addDialog(this.ref);

    }

    ngOnInit(): void {
        this.cashService.opened$.subscribe((opened) => {
            this.cashRegisterId = opened ? opened : '';
        });
        this.cashRegisterOperations.cashRegisterId$.subscribe((opened) => {
            if (opened !== '') {
                this.cashRegisterOperations.setOpened(true)
                this.cashRegisterId = opened;
            }

        });
        this.cashRegisterOperations.closing$.subscribe((close: ChashRegisterSummaryDto) => {
            if (close) {
                this.closingCaixa = true;
                this.titleModal = 'Resumo do Fechamento de Caixa';
                this.cashOperations = close;
            }
        });
        // this.cashRegisterOperations.opened$.subscribe((opened) => {
        //     if (opened === false) {
        //         this.cashService.setOpened(null)
        //         this.ref.close()
        //     }
        // })
        // this.cashRegisterOperations.getOperationsById(this.cashRegisterId);
    }

    fechar(){
        this.cashService.setOpened(null)
        this.cashRegisterOperations.setOpened(null)
        this.ref.close()
    }

    fecharCaixa() {
        this.cashRegisterOperations.closeCashRegisterOperations(this.closingValue, this.cashRegisterId);
    }
}
