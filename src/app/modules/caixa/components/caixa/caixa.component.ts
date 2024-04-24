import {Component, effect, HostListener, OnInit} from '@angular/core';
import {NotifyService} from "../../../../layout/service/notify.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CaixaService} from "../../services/caixa.service";
import {ProductService} from "../../../inventory/product/services/product.service";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {cloneDeep, isArray} from "lodash";
import {DeleteOrderProductDto, ProductLightDto} from "../../../../core/models/products";
import {isObject} from "../../../../core/util";
import {DialogService} from "primeng/dynamicdialog";
import {AdditionalComponents} from "../modals/additionals/additional-components.component";
import {MTransferComponents} from "../modals/transfer/transfer.components";
import {MCancelProductsComponents} from "../modals/cancel_products/cancel-products.components";
import {StoreTablesServices} from "../../services/store.tables.services";
import {MComandaComponents} from "../modals/m-comanda/m-comanda.components";
import {ToastMessageService} from "../../../../core/injects/toast-message.service";
import {CashRegisterService} from "../../../shops/service/cash-register.service";


@Component({
    templateUrl: './caixa.component.html',
    styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit {

    ordersProducts: ProductLightDto[] = []
    orders: any[] = []

    pagamento = false;
    oneClosed = false;
    cancellation = false;
    cpfNota = false;

    itemFinded: any;

    selectedItem: any;
    selectedItemAmount: number = 1;

    suggestions: any[] = [];

    //Show or Hide WeightScale
    visible: boolean = false;
    weightScale = 0
    searchText: string;
    weightOptions: any[] = [{label: 'Manual', value: 'off'}, {label: 'Automático', value: 'on'}];

    value: string = 'off';

    activeOrder = 0;

    dialogNameCliente = false;
    clientName = '';

    canFinalize$: boolean;
    activeRoute: string;
    activeRouteOrder: string;
    totalOrders = 0;

    constructor(public notify: NotifyService,
                private http: HttpClient,
                private activatedRoute: Router,
                private dialogService: DialogService,
                private productService: ProductService,
                private toastMessageService: ToastMessageService,
                private storeTablesServices: StoreTablesServices,
                private router: Router,
                public cashService: CashRegisterService,
                public service: CaixaService) {
        this.cashService.existsAnyWorking();
        this.notify.weightScale$.subscribe(weight => {
            if (weight !== "" && this.value === 'on') {
                this.weightScale = parseFloat(weight)
            }
        })
        effect(() => {
            if (this.productService.listEntities$()) {
                this.suggestions = this.productService.listEntities$() ?? []
            }
            if (this.service.selectedEntity$()) {

                this.orders = this.service.selectedEntity$().filter((f: any) => (f.state !== 'CANCELLED' || f.state !== 'FINISHED'));
                this.comandaTotal();
                //AQUI QUITE CONDICION  && x.valueToPaid !== 0
                const allOrdersPaid = this.orders.every((x: any) => (x.valueToPaid === x.valuePaid));
                this.oneClosed = this.orders.some((x: any) => (x.state === 'CLOSED'));
                if (allOrdersPaid) {
                    this.service.setFinalizeValue(true);
                }
                if (this.oneClosed) {
                    this.pagamento = true;
                }

                if(this.orders.every((x: any) => (x.state === 'FINISHED'))){
                    this.service.setSelected(null);
                    this.router.navigate(['/comandas'])
                }
                this.ordersProducts = cloneDeep(this.service.selectedEntity$().products)
            }
            if (this.storeTablesServices.finalize$()) {
                this.service.setSelected(null);
                this.router.navigate(['/comandas'])
            }
        })
        effect(async () => {
            this.getOrders();
        }, {allowSignalWrites: true})
    }

    ngOnInit(): void {
        this.service.canFinalize$.subscribe((value: boolean) => {
            this.canFinalize$ = value;
        });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'F5':
                this.refreshOrders();
                //this.updateOrders();
                break;
            case 'F9':
                this.finalizeOrder()
                break;
            case 'F10':
                this.transferOrders()
                break;
            case 'F12':
                this.pagamento = true;
                break;
            case 'Escape':
                this.closeOrders();
                break;
            case 'Enter':
                if (this.selectedItem !== undefined) {
                    if (this.selectedItem.allowsAdditional) {
                        this.dialogService.open(AdditionalComponents, {
                            data: {
                                product: this.selectedItem,
                                activeOrder: this.activeOrder,
                                amount: this.selectedItemAmount,
                            },
                            modal: true,
                            style: {'width': '60vw', 'height': '60vw'},
                            draggable: false,
                            resizable: false
                        }).onClose.subscribe(() => {
                            this.resetAllValues();
                        })
                    } else {
                        if (this.selectedItem.soldPerUnits) {
                            this.addElementComanda({count: 1, ...this.selectedItem});
                        } else {
                            this.visible = true;
                        }
                    }
                } else {
                    if (this.pagamento) {
                        const url = `http://127.0.0.1:8020/api/notifications/print`;
                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                        });
                        this.http.post(url, {data: this.ordersProducts}, {headers}).subscribe();
                    }
                }
                break;

        }

    }


    finalizeOrder() {
        switch (this.activeRoute) {
            case 'table':
                this.storeTablesServices.changeStateTable(this.activeRouteOrder, 'FREE')
                break;
            case 'order':
                this.service.changeFieldStateOrders(this.activeRouteOrder, {state: 'FINISHED'})
                break;
            default:
                this.service.getById([], this.activeRouteOrder)
        }
        // }
    }

    isPaid(product: any) {
        return product.paid;
    }

    addNewOrderTable() {
        this.service.openModalAddOrEdit();
        if (this.activeRoute === 'table') {
            this.dialogService.open(MComandaComponents, {
                data: {
                    id: this.activeRouteOrder,
                    inside: true
                },
                width: '350px',
            })
        }
    }

    getOrders() {
        this.activeRouteOrder = this.activatedRoute.routerState.snapshot.url.split('/').slice(-2)[1];
        this.activeRoute = this.activatedRoute.routerState.snapshot.url.split('/').slice(-2)[0];
        switch (this.activeRoute) {
            case 'table':
                this.service.getById(['by-table'], {tableId: this.activeRouteOrder})
                break;
            case 'table-union':
                this.service.getById(['by-union-table'], {unionTableId: this.activeRouteOrder})
                break;
            default:
                this.service.getById([], this.activeRouteOrder)
        }
    }

    refreshOrders() {
        this.getOrders();
    }

    transferOrders() {
        if(this.service.selectedEntity$()[this.activeOrder].products.length > 0){
            this.dialogService.open(MTransferComponents, {
                data: this.service.selectedEntity$()[this.activeOrder],
                modal: true,
                style: {'width': '60vw'},
                draggable: false,
                resizable: false
            })
        } else{
            this.toastMessageService.showMessage("info", 'INFO', 'Nao tem productos para transferir')
        }

    }

    closeOrders() {
        this.service.setSelected(null);
        this.router.navigate(['/comandas'])
    }

    updateOrders() {
        this.dialogNameCliente = true
    }

    comandaTotal(): void {
        this.totalOrders =  this.orders?.reduce((sumaTotal: any, item: any) =>
                sumaTotal + (item.valueToPaid - item.valuePaid),
            0
        ) || 0;
    }

    comandaAllTotal(): number {
        return this.orders?.reduce((sumaTotal: any, item: any) =>
                sumaTotal + item.valueToPaid,
            0
        ) || 0;
    }

    onScroll(event: Event): void {
        const {scrollTop, scrollHeight, clientHeight} = event.target as HTMLElement;
        const position = Math.round(scrollTop / (scrollHeight - clientHeight) * 100);
        if (position >= 98) {
            console.log('hacer petecion mas 1 pagina')
        }
    }

    fecharConta() {
        switch (this.activeRoute) {
            case 'table':
                this.storeTablesServices.changeStateTable(this.activeRouteOrder, 'CLOSED')
                break;
            case 'table-union':

                break;
            default:
                this.service.changeFieldStateOrders(this.activeRouteOrder, {state: "CLOSED"})
        }
    }

    goToPayment(): void {
        this.pagamento = true;
    }

    deleteFromOrder(pedido: any): void {
        this.dialogService.open(MCancelProductsComponents, {
            modal: true,
            style: {'width': '20vw'},
            draggable: false,
            resizable: false
        }).onClose.subscribe((data) => {
            if(data.cancel){
                const deleteTO: DeleteOrderProductDto = {
                    description: data.data.description,
                    productIds:[pedido.id]
                }
                this.service.deleteProductsOrders(this.service.selectedEntity$()[this.activeOrder].id, deleteTO)
            }
        })
    }

    deleteAll(): void {
        this.dialogService.open(MCancelProductsComponents, {
            modal: true,
            style: {'width': '22vw'},
            draggable: false,
            resizable: false
        }).onClose.subscribe((data) => {
            if(data.cancel){
                const deleteTO: DeleteOrderProductDto = {
                    description: data.data.description,
                    productIds:this.service.selectedEntity$()[this.activeOrder].products.map((obj:any) => {
                        return obj.id
                    }),
                }
                this.service.deleteProductsOrders(this.service.selectedEntity$()[this.activeOrder].id, deleteTO)
            }
        })
    }

    lookAdditional(product: any) {
        this.dialogService.open(AdditionalComponents, {
            data: {
                product: product,
                additionalSelected: product.additionals
            },
            modal: true,
            style: {'width': '60vw', 'height': '60vw'},
            draggable: false,
            resizable: false
        })
    }

    addElementComanda(event: ProductLightDto): void {
        const params = [
            {id: event.id, amount: this.selectedItemAmount, additionals: []}
        ];
        this.service.addProductsOrders(this.service.selectedEntity$()[this.activeOrder].id, params)
        this.resetAllValues();
    }

    searchProducts(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.productService.autocomplete({filter: this.searchText, type: 'SIMPLE'});
    }


    search(event: AutoCompleteCompleteEvent) {
        if (this.productService.autocomplete$()) {
            this.suggestions = this.productService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    confirmWeight() {
        this.visible = false;
        if (this.itemFinded !== null) {
            let item = {
                count: this.selectedItemAmount,
                ...this.itemFinded,
                peso_liquido: Number(this.weightScale),
            }
            this.addElementComanda(item);
        }
    }

    sellConfirmed(data: any) {
        console.log(data)
    }

    goBack(data: any) {
        this.pagamento = false
    }

    closeModalCancellation(evt: any) {
        if (evt) {
        }
    }

    closeModalCpfNota(evt: any) {
        if (evt) {
        }
    }

    refresListProduct() {
        this.service.loadNewListProduct(this.activeOrder);
    }

    confirmNameClient() {

    }

    discardNameClient() {

    }

    getTitleComanda(item: any): string {
        if (item.clientName) {
            return `Order do: ${item.clientName}`
        }
        if (item.tableNumber) {
            return `Mesa numero: ${item.tableNumber}`
        }
        return `Pedido #: ${item.code}`
    }

    resetAllValues() {
        this.itemFinded = undefined;
        this.selectedItem = null;
        this.weightScale = 0
        this.selectedItemAmount = 1
    }

    setDisabled() {
        return this.value === 'on';
    }

    protected readonly isObject = isObject;
    protected readonly isArray = isArray;
}
