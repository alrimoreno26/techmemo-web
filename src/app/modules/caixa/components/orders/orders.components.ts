import {Component, effect, OnInit} from "@angular/core";
import {CaixaService} from "../../services/caixa.service";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {MComandaComponents} from "../modals/m-comanda/m-comanda.components";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {StoreTablesServices} from "../../services/store.tables.services";
import {tableState} from "../../../../core/models/tables";
import {SessionServices} from "../../../../core/injects/session.services";
import {operationAreaRoleEnum} from "../../../../core/enums/role";
import {ToastMessageService} from "../../../../core/injects/toast-message.service";
import {MOpenCaixaComponents} from "../modals/m-open-caixa/m-open-caixa.components";
import {MCloseCaixaComponents} from "../modals/m-close-caixa/m-close-caixa.components";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {CashRegisterService} from "../../../shops/service/cash-register.service";
import {CashRegisterOperationsService} from "../../../shops/service/cash-register-operations.service";
import {MExtractionMoneyComponents} from "../modals/m-extraction-money/m-extraction-money.components";
import {CashRegisterExtractionsService} from "../../../shops/service/cash-register-extractions.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.components.html',
    styleUrls: ['./orders.components.scss']
})
export class OrdersComponents extends BaseComponentDirective implements OnInit {

    isTable = true;
    table_union: string[] = [];
    free: number;
    busy: number;

    fromTable: any;
    typeComanda: string
    listComanda: any[];

    caixaOpened: any;
    actualStore: any;

    constructor(public service: CaixaService,
                public tableService: StoreTablesServices,
                private router: Router,
                public layoutService: LayoutService,
                private toastMessageService: ToastMessageService,
                public cashRegisterOperations: CashRegisterOperationsService,
                public cashRegisterExtractionsService: CashRegisterExtractionsService,
                public session: SessionServices,
                private cashRegisterService: CashRegisterService,
                private datePipe: DatePipe) {
        super()
        this.tableService.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
        this.cashRegisterService.existsAnyWorking();
        this.actualStore = this.session.getCurrentStore().id;
        effect(() => {
            if (this.service.orderCreate$()) {
                if (this.service.selectedEntity$()[0].tableNumber !== null) {
                    let tableId = tableService.listEntities$()?.find(f => f.number.toString() === this.service.selectedEntity$()[0].tableNumber)?.id;
                    this.router.navigate([`/comandas/table/${tableId}`]).then();
                } else {
                    this.router.navigate([`/comandas/order/${this.service.selectedEntity$()[0].id}`]).then();
                }

            }
            if (tableService.listEntities$()) {
                this.table_union = [];
                this.free = tableService.listEntities$()?.filter(f => f.state === tableState.FREE).length || 0;
                this.busy = tableService.listEntities$()?.filter(f => f.state === tableState.BUSY || f.state === tableState.BUSY_WITH_UNION).length || 0;
            }
            const amountOrders = this.session.getCurrentStore().amountOrders;

            this.listComanda = Array.from({length: amountOrders}, (_, index) => {
                const numeriCode = (Number(1000) + Number(index + 1))
                const generatedCode = "C" + numeriCode;

                // Busca si el código existe en el array de pedidos existentes
                const existingOrder = this.service.listEntities$()?.find(order => order.type === 'ORDER' && order.code === numeriCode.toString());

                // Si existe, toma los valores del pedido existente; si no, usa valores por defecto
                return {
                    id: existingOrder ? existingOrder.id : index + 1,
                    clientName: existingOrder ? existingOrder.clientName : null,
                    valueToPaid: existingOrder ? existingOrder.valueToPaid : 0,
                    created: existingOrder ? existingOrder.created : "",
                    code: generatedCode,
                    name: `Order ${index + 1}`,
                    state: existingOrder ? existingOrder.state : 'open'
                };
            });
        });

    }

    getListTypeEntitys() {
        if (this.typeComanda === 'ORDER') {
            return this.listComanda
        } else {
            return this.service.listEntities$()?.filter(f => f.type === this.typeComanda) || [];
        }
    }

    //TODO CUANDO TERMINEN TESTES HABILITAR
    ngOnInit() {
        this.cashRegisterService.opened$.subscribe((opened) => {
            console.log(opened)
            //opened === null ? this.caixaOpened = false : this.caixaOpened = opened;

            // if (this.session.userLogged.role.operationArea === 'ADMINISTRATOR_STORE') {
            //     this.caixaOpened = true
            // } else if (opened)
            this.caixaOpened = true;
        })
        // this.cashRegisterOperations.opened$.subscribe((opened) => {
        //     console.log(opened)
        //     // if (this.session.userLogged.role.operationArea === 'ADMINISTRATOR_STORE') {
        //     //     this.caixaOpened = true
        //     // } else if (opened)
        //     this.caixaOpened = opened;
        //
        // })
        this.session.actualStore$.subscribe((store) => {
            if (store.id !== this.actualStore) {
                this.actualStore = store.id;
                this.loadComanda()
                this.loadMesas()
            }
        })
    }

    loadComanda(type: string = '') {
        this.isTable = false;
        this.typeComanda = type;
        this.service.loadAll({pageNumber: 0, pageSize: 50, states: ['ACTIVE', 'IN_PAYMENT', 'PAID', 'CLOSED']})
    }

    loadMesas() {
        this.isTable = true;
        this.tableService.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
    }


    addOrOpenTable(event: any, table: any) {
        if (event.target.classList.contains('p-checkbox-box') || event.target.classList.contains('p-checkbox-icon')) {
            event.stopPropagation();
        } else {
            if (!this.caixaOpened) {
                this.toastMessageService.showMessage("warn", 'INFO', 'Caixa fechado')
                return;
            } else {
                switch (table.state) {
                    case tableState.FREE:
                        this.typeComanda = 'TABLE';
                        this.fromTable = table.id;
                        this.service.openModalAddOrEdit();
                        this.dialogService.open(MComandaComponents, {
                            data: {id: table.id, type: this.typeComanda},
                            width: '350px',
                        })
                        break;
                    case tableState.BUSY_WITH_UNION:
                        this.router.navigate([`/comandas/table-union/${table.unionTableId}`], {state: {data: table}}).then();
                        break;
                    default:
                        this.router.navigate([`/comandas/table/${table.id}`]).then();
                }
                if (table.state === tableState.FREE) {

                } else {

                }
            }
        }
    }

    navigateToOrder(item: any) {
        if (this.session.onlyPosManageItem() && item.state === 'CLOSED') {
            this.toastMessageService.showMessage("warn", 'INFO', 'Essa mesa já fechou a conta e vem fazendo pagamentos')
        } else {
            this.service.getById([], item.id)
            this.router.navigate([`/comandas/order/${item.id}`]).then();
        }
    }

    openOrder(item: any) {
        if (this.typeComanda === 'ORDER') {
            const exist = this.service.listEntities$()?.find(f => f.type === this.typeComanda && f.code === item.code.split('C')[1]);
            if (exist) {
                this.navigateToOrder(exist);
            } else {
                this.addNewComanda(item)
            }
        } else {
            this.navigateToOrder(item);
        }

    }

    transformDate(fecha: string) {
        return this.datePipe.transform(fecha, 'dd-MM-yyyy');
    }

    juntarMesas() {
        this.service.joinTables(this.table_union);
    }

    addNewComanda(item: any = null) {
        this.service.openModalAddOrEdit();
        this.fromTable = null;
        this.dialogService.open(MComandaComponents, {
            data: {type: this.typeComanda, item: item},
            width: '350px',
        })
    }

    get getWidthClass() {
        return {
            'lg:px-12': this.session.onlyPosManageItem(),
            'lg:px-8': this.session.userLogged.role.operationArea !== operationAreaRoleEnum.ATTENDANT && this.session.userLogged.role.operationArea !== operationAreaRoleEnum.WAITER,
        }

    }

    closeCaixa() {
        this.dialogService.open(MCloseCaixaComponents, {
            data: null,
        });
    }

    extractionCaixa() {
        this.cashRegisterExtractionsService.openModalAddOrEdit();
        this.dialogService.open(MExtractionMoneyComponents, {
            data: null,
            width: '300px',
        });
    }

    openCaixa() {
        this.dialogService.open(MOpenCaixaComponents, {
            data: null,
            width: '300px',
        });
    }

    getTitleComanda(item: any): string {
        const clientInfo = item.clientName ? ` - ${item.clientName}` : '';

        if (this.typeComanda === 'BALCONY') {
            return `Pedido #${item.code}${clientInfo}`;
        }

        if (this.typeComanda === 'ORDER') {
            return `Comanda #${item.code}${clientInfo}`;
        }

        if (item.tableNumber) {
            return `Mesa numero: ${item.tableNumber}`;
        }

        return item.clientName ? `Order do: ${item.clientName}` : `Pedido #: ${item.code}`;
    }

    protected readonly tableState = tableState;
}
