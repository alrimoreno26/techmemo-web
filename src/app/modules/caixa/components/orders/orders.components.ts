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

    constructor(public service: CaixaService,
                public tableService: StoreTablesServices,
                private router: Router,
                private toastMessageService: ToastMessageService,
                private session: SessionServices,
                private datePipe: DatePipe) {
        super()
        this.tableService.loadAll({lazy: {page: 0, count: 50}})
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
                this.free = tableService.listEntities$()?.filter(f => f.state === tableState.FREE).length || 0;
                this.busy = tableService.listEntities$()?.filter(f => f.state === tableState.BUSY || f.state === tableState.BUSY_WITH_UNION).length || 0;
            }
        });
    }

    ngOnInit() {
    }

    loadComanda() {
        this.isTable = false;
        this.service.loadAll({page: 0, count: 50, state: 'ACTIVE'})
    }

    loadMesas() {
        this.isTable = true;
        this.tableService.loadAll({lazy: {page: 0, count: 50}})
    }


    addOrOpenTable(event: any, table: any) {
        if (event.target.classList.contains('p-checkbox-box') || event.target.classList.contains('p-checkbox-icon')) {
            event.stopPropagation();
        } else {
            switch (table.state) {
                case tableState.FREE:
                    this.fromTable = table.id;
                    this.service.openModalAddOrEdit();
                    this.dialogService.open(MComandaComponents, {
                        data: {id: table.id},
                        width: '350px',
                    })
                    break;
                case tableState.BUSY_WITH_UNION:
                    this.router.navigate([`/comandas/table-union/${table.unionTableId}`]).then();
                    break;
                default:
                    this.router.navigate([`/comandas/table/${table.id}`]).then();
            }
            if (table.state === tableState.FREE) {

            } else {

            }

        }

    }

    openOrder(item: any) {
        if (this.session.onlyPosManageItem() && item.state === 'CLOSED') {
            this.toastMessageService.showMessage("warn", 'INFO', 'Essa mesa já fechou a conta e vem fazendo pagamentos')
        } else {
            this.service.getById([], item.id)
            this.router.navigate([`/comandas/order/${item.id}`]).then();
        }

    }

    transformDate(fecha: string) {
        return this.datePipe.transform(fecha, 'dd-MM-yyyy');
    }

    juntarMesas() {
        this.service.joinTables(this.table_union);
    }

    addNewComanda() {
        this.service.openModalAddOrEdit();
        this.fromTable = null;
        this.dialogService.open(MComandaComponents, {
            data: null,
            width: '350px',
        })
    }

    get getWidthClass() {
        return {
            'lg:px-12': this.session.onlyPosManageItem(),
            'lg:px-8': this.session.userLogged.role.operationArea !== operationAreaRoleEnum.ATTENDANT && this.session.userLogged.role.operationArea !== operationAreaRoleEnum.WAITER,
        }

    }

    getTitleComanda(item: any): string {
        if (item.tableNumber) {
            return `Mesa numero: ${item.tableNumber}`
        }
        if (item.clientName) {
            return `Order do: ${item.clientName}`
        }
        return `Pedido #: ${item.code}`
    }

    protected readonly tableState = tableState;
}
