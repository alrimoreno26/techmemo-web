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
import {OverlayPanel} from "primeng/overlaypanel";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {StoreCategoryService} from "../../../inventory/category/services/store.category.service";
import {MFlavorsProductsComponents} from "../modals/m-flavors/flavors-products.components";
import {MDescriptionsComponent} from "../modals/m-show-description/m-descriptions.component";

export interface TableUnion {
    unionTableId: string;
    tableId: string | null;
}


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
    selectedDescription: string = '';
    selectedItemAmount: number = 1;

    suggestions: any[] = [];

    //Show or Hide WeightScale
    visible: boolean = false;
    weightScale = 0
    searchText: string;
    weightOptions: any[] = [{label: 'Manual', value: 'off'}, {label: 'Automático', value: 'on'}];

    value: string = 'off';

    activeOrder = 0;
    modify = 0;

    dialogNameCliente = false;
    clientName = '';
    editedProduct = null;

    canFinalize$: boolean;
    activeRoute: string;
    activeRouteOrder: string;
    totalOrders = 0;

    tableIdUnion: string;
    tableUnion: TableUnion = {
        tableId: '',
        unionTableId: ''
    };

    stateOptions: any[] = [];
    selectedCategory: any = '';

    constructor(public notify: NotifyService,
                private http: HttpClient,
                private activatedRoute: Router,
                private dialogService: DialogService,
                private productService: ProductService,
                public categoryService: StoreCategoryService,
                private toastMessageService: ToastMessageService,
                public client: HttpClient,
                public storeTablesServices: StoreTablesServices,
                private router: Router,
                public cashService: CashRegisterService,
                private fb: FormBuilder,
                public service: CaixaService) {
        this.cashService.existsAnyWorking();
        this.categoryService.loadAll({pageNumber: 0, pageSize: 50, type: 'PARENT'})
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
                const temp = this.service.selectedEntity$().filter((f: any) => (f.state !== 'CANCELLED' || f.state !== 'FINISHED'));
                this.orders = cloneDeep(temp)
                this.comandaTotal();
                //AQUI QUITE CONDICION  && x.valueToPaid !== 0
                const allOrdersPaid = this.orders.every((x: any) => (x.valueToPaid === x.valuePaid));
                this.oneClosed = this.orders.some((x: any) => (x.state === 'CLOSED'));
                if (allOrdersPaid) {
                    this.service.setFinalizeValue(true);
                }
                this.pagamento = this.oneClosed;
                if (this.orders.every((x: any) => (x.state === 'CANCELLED'))) {
                    this.service.setSelected(null);
                    this.router.navigate(['/comandas'])
                }
                if (this.orders.every((x: any) => (x.state === 'FINISHED'))) {
                    this.service.setSelected(null);
                    this.router.navigate(['/comandas'])
                }
                this.ordersProducts = cloneDeep(this.service.selectedEntity$().products)
            }
            if (this.storeTablesServices.finalize$()) {
                this.service.setSelected(null);
                this.router.navigate(['/comandas'])
            }

            if (this.service.sentKitchen$()) {
                this.toastMessageService.showMessage("success", 'INFO', 'Pedido enviado para a cozinha')
            }
        })
        effect(async () => {
            this.getOrders();
        }, {allowSignalWrites: true})
        effect(async () => {
            this.stateOptions = [];
            if (this.categoryService.listEntities$().length > 0) {
                this.stateOptions.push({label: 'TODAS', value: ''})
                this.categoryService.listEntities$().map((cs: any) => {
                    this.stateOptions.push({label: cs.name, value: cs.id, logo: cs.logo})
                })
            }
        }, {allowSignalWrites: true})
        const navigation = this.router.getCurrentNavigation();
        this.tableUnion = {
            unionTableId: this.activatedRoute.routerState.snapshot.url.split('/').slice(-2)[1],
            tableId: null
        }
        if (navigation && navigation.extras && navigation.extras.state) {
            this.tableUnion.tableId = navigation.extras.state['data'].id;
        }
    }

    ngOnInit(): void {
        this.service.canFinalize$.subscribe((value: boolean) => {
            this.canFinalize$ = value;
        });
        this.productService.autocompleteSearch$.subscribe(data => {
            // Actualiza las sugerencias basándote en el valor de autocomplete
            this.suggestions = data.map((item: any) => item);
            // Lógica para seleccionar automáticamente un solo elemento
            // if (data.length === 1) {
            //     this.selectedItem = data[0];
            // }
        });
    }

    clearSelected() {
        this.selectedCategory = '';
    }

    selectedProduct(product: any) {
        this.selectedItem = product;
    }

    selectedCategoryItem(category: any) {
        this.selectedCategory = category;
        this.productService.autocomplete({
            filter: this.searchText,
            type: 'SIMPLE',
            pageNumber: 0,
            pageSize: 100,
            parentCategoryId: this.selectedCategory.value,
            showEnables: true,
            showInMenu: true
        });
    }

    @
        HostListener('document:keydown', ['$event'])
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
                this.addProductToOrder();
                break;

        }

    }

    addProductToOrder() {
        if (this.selectedItem !== undefined) {
            if (this.selectedItem.allowsAdditional || this.selectedItem.allowsFlavors) {
                this.service.openCustomDialog('additional', true);
                this.dialogService.open(AdditionalComponents, {
                    data: {
                        product: this.selectedItem,
                        activeOrder: this.activeOrder - 1,
                        created: true,
                        amount: this.selectedItemAmount,
                    },
                    modal: true,
                    style: {'width': '65vw', 'height': '70vw'},
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

    addNewOrderTable(op: OverlayPanel, event: any) {
        this.service.openModalAddOrEdit();
        if (this.activeRoute === 'table-union') {
            this.storeTablesServices.allTableInUnion(this.tableUnion.unionTableId);
            op.toggle(event);
        }
        if (this.activeRoute === 'table') {
            this.dialogService.open(MComandaComponents, {
                data: {
                    id: this.activeRouteOrder,
                    type: 'TABLE',
                    inside: true
                },
                width: '350px',
            })
        }
    }

    selectedTableForOrder() {
        const deep = cloneDeep(this.tableUnion);
        deep.tableId = this.tableIdUnion;
        this.dialogService.open(MComandaComponents, {
            data: {
                id: deep.tableId,
                inside: true,
                type: this.activeRoute,
                tableUnion: deep
            },
            width: '350px',
        })
    }

    getOrders() {
        this.activeRouteOrder = this.activatedRoute.routerState.snapshot.url.split('/').slice(-2)[1];
        this.activeRoute = this.activatedRoute.routerState.snapshot.url.split('/').slice(-2)[0];

        switch (this.activeRoute) {
            case 'table':
                this.service.getById(['by-table'], {tableId: this.activeRouteOrder})
                break;
            case 'table-union':
                this.service.getByUnionId(['by-union-table'], this.tableUnion)
                break;
            default:
                this.service.getById([], this.activeRouteOrder)
        }
    }

    refreshOrders() {
        this.getOrders();
    }

    cancelOrders() {
        switch (this.activeRoute) {
            case 'table':
                break;
            case 'order':
                this.dialogService.open(MCancelProductsComponents, {
                    modal: true,
                    style: {'width': '22vw'},
                    draggable: false,
                    resizable: false
                }).onClose.subscribe((data) => {
                    if (data.cancel) {
                        this.service.changeFieldStateOrders(this.activeRouteOrder, {state: 'CANCELLED'})
                    }
                })
                break;
        }
    }

    transferOrders() {
        if (this.service.selectedEntity$()[this.activeOrder - 1].products.length > 0) {
            this.service.openCustomDialog('transfer', true);
            this.dialogService.open(MTransferComponents, {
                data: {
                    order: this.service.selectedEntity$()[this.activeOrder - 1],
                    activeRouteOrder: this.activeRouteOrder,
                    byRoute: this.activeRoute
                },
                modal: true,
                style: {'width': '65vw'},
                draggable: false,
                resizable: false
            })
        } else {
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
        this.totalOrders = this.service.selectedEntity$().reduce((sumaTotal: any, item: any) =>
                sumaTotal + (item.valueToPaid),
             0
        )
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
                ''

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
            if (data.cancel) {
                const deleteTO: DeleteOrderProductDto = {
                    description: data.data.description,
                    productIds: [pedido.id]
                }
                this.service.deleteProductsOrders(
                    this.service.selectedEntity$()[this.activeOrder - 1].id,
                    deleteTO,
                    {
                        order: this.service.selectedEntity$()[this.activeOrder - 1],
                        activeRouteOrder: this.activeRouteOrder,
                        byRoute: this.activeRoute
                    })
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
            if (data.cancel) {
                const deleteTO: DeleteOrderProductDto = {
                    description: data.data.description,
                    productIds: this.service.selectedEntity$()[this.activeOrder - 1].products.map((obj: any) => {
                        return obj.id
                    }),
                }
                this.service.deleteProductsOrders(
                    this.service.selectedEntity$()[this.activeOrder - 1].id,
                    deleteTO,
                    {
                        order: this.service.selectedEntity$()[this.activeOrder - 1],
                        activeRouteOrder: this.activeRouteOrder,
                        byRoute: this.activeRoute
                    })
            }
        })
    }

    lookAdditional(product: any) {
        this.service.openCustomDialog('additional', true);
        this.dialogService.open(AdditionalComponents, {
            data: {
                product: product,
                amount: product.amount,
                created: false,
                activeOrder: this.activeOrder - 1,
                additionalSelected: product.additionals
            },
            modal: true,
            style: {'width': '65vw', 'height': '70vw'},
            draggable: false,
            resizable: false
        })
    }

    lookDescription(product: any) {
        this.service.openCustomDialog('description', true);
        this.dialogService.open(MDescriptionsComponent, {
            data: {
                product: product,
            },
            modal: true,
            style: {'width': '34vw', 'height': '21vw'},
            draggable: false,
            resizable: false
        })
    }

    addElementComanda(event: ProductLightDto): void {
        const params = [
            {
                id: event.id,
                amount: this.selectedItemAmount,
                additionals: [],
                weight: event.weight,
                description: this.selectedDescription
            }
        ];
        this.service.addProductsOrders(this.service.selectedEntity$()[this.activeOrder - 1].id, params)
        this.resetAllValues();
    }

    searchProducts(event: { target: { value: string; } } | any) {
        this.searchText = event.target.value;
        this.productService.autocomplete({
            filter: this.searchText,
            type: 'SIMPLE',
            pageNumber: 0,
            pageSize: 100,
            parentCategoryId: this.selectedCategory.value,
            showEnables: true,
            showInMenu: true
        });
    }


    search(event: AutoCompleteCompleteEvent) {

    }

    confirmWeight() {
        this.visible = false;
        if (this.selectedItem !== null) {
            let item = {
                count: this.selectedItemAmount,
                ...this.selectedItem,
                weight: Number(this.weightScale),
            }
            this.addElementComanda(item);
        }
    }

    sellConfirmed(data: any) {
        console.log(data)
    }

    goBack(data: any) {
        switch (this.activeRoute) {
            case 'table':
                this.storeTablesServices.changeStateTable(this.activeRouteOrder, 'ACTIVE')
                this.pagamento = false
                break;
            case 'table-union':

                break;
            default:
                this.service.changeFieldStateOrders(this.activeRouteOrder, {state: "ACTIVE"})
        }

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
        this.service.loadNewListProduct(this.activeOrder - 1);
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

    getComanda(item: any): string {
        return item.clientName || item.tableNumber || item.code || ''; // Devolver lo primero disponible
    }

    getTitleOrder() {
        const item = this.service.selectedEntity$()[this.activeOrder - 1];
        return item.clientName || item.tableNumber || item.code || ''; // Devolver lo primero disponible
    }

    resetAllValues() {
        this.itemFinded = undefined;
        this.selectedCategory = '';
        this.selectedItem = null;
        this.weightScale = 0
        this.selectedItemAmount = 1
    }

    setDisabled() {
        return this.value === 'on';
    }

    printCozinha() {
        this.service.sentOrdersKitchen(this.service.selectedEntity$()[this.activeOrder - 1].id);
        this.client.post('http://localhost:8020/api/notifications/print', {data: [{test: "metodo print"}]}).subscribe()
    }

    onChangeAmount(product: any) {
        this.service.updateProductsOrders(product.id, this.service.selectedEntity$()[this.activeOrder - 1].id, [{amount: Number(product.amount)}]);
    }

    addElementClick(product: any, action: '+' | '-') {
        if (action === '+') {
            product.amount = (product.amount || 1) + 1;
        } else if (action === '-') {
            if (!product.amount || product.amount <= 1) {
                product.amount = 1;
            } else {
                product.amount -= 1;
            }
        }
        this.editedProduct = product;
        // // Opcional, si necesitas hacer algo después del cambio
    }

    onCellEditComplete(event: any) {
        this.onChangeAmount(this.editedProduct);
        this.editedProduct = null;
    }

    protected readonly isObject = isObject;
    protected readonly isArray = isArray;
}
