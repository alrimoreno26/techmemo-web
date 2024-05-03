import {Component, effect, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {Table} from 'primeng/table';
import {MenuItem} from 'primeng/api';
import {StoreDashboardServices} from "../services/dashboard.services";
import {ReportsDTO} from "../../../core/models/reports";
import {CommercesService} from "../../shops/service/commerces.service";
import {SessionServices} from "../../../core/injects/session.services";
import {AppConfig} from "../../../core/models/layout";
import {AuthServices} from "../../../core/services/auth.services";
import {CashRegisterService} from "../../shops/service/cash-register.service";
import {CashRegisterOperationsService} from "../../shops/service/cash-register-operations.service";
import {ChashRegisterSummaryDto} from "../../../core/models/commerce";
import {ToastMessageService} from "../../../core/injects/toast-message.service";
import {MOpenCaixaComponents} from "../../caixa/components/modals/m-open-caixa/m-open-caixa.components";
import {DialogService} from "primeng/dynamicdialog";
import {formatDate} from "../../../core/util";

@Component({
    selector: 'c-commerce-dashboard',
    templateUrl: './ecommerce.dashboard.component.html'
})
export class EcommerceDashboardComponent implements OnInit, OnDestroy {

    stats: ReportsDTO;

    productsBestSellers: any[] = [];

    subscription!: Subscription;

    items: MenuItem[] = [];

    config!: AppConfig;

    metrics: any[] = [];

    expenses: any = [];

    caixasList: any = [];

    sidebarVisible: boolean;
    sidebarOption = 'info';

    cashOperations: any = null;

    historicalCashOperations: any[] = [];

    expandedRows = {};

    rangeDates: Date[] = [new Date(), new Date()];

    constructor(private layoutService: LayoutService,
                public store: StoreDashboardServices,
                public cashRegisterOperations: CashRegisterOperationsService,
                private dialogService: DialogService,
                private toastMessageService: ToastMessageService,
                public caixas: CashRegisterService,
                public session: SessionServices) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.config = config;
        });

        effect(() => {
            if (this.cashRegisterOperations.selectedEntity$()) {
                this.cashOperations = null;
                this.historicalCashOperations = [];
                this.cashOperations = this.cashRegisterOperations.selectedEntity$() as ChashRegisterSummaryDto
            }
            if (this.cashRegisterOperations.listEntities$()) {
                if (this.cashRegisterOperations.listEntities$().length > 0 && this.sidebarOption === 'historical') {
                    this.cashOperations = null;
                    this.historicalCashOperations = [];

                    this.cashRegisterOperations.listEntities$().forEach((x: any, i: number) => {
                        this.historicalCashOperations.push({...x, id: i})
                    })
                }

            }
            if (this.caixas.listEntities$().length > 0) {
                this.caixasList = this.caixas.listEntities$().filter((c: any) => c.enabled);
            }

        });

        effect(() => {
            if (this.store.stat$()) {
                this.stats = this.store.stat$();
                this.metrics = [
                    {
                        title: 'Ordenes',
                        icon: 'pi pi-shopping-cart',
                        color_light: '#64B5F6',
                        color_dark: '#1976D2',
                        textContent: [
                            {amount: this.stats.orderSummary.totalActive, text: 'Ativas'},
                            {amount: this.stats.orderSummary.totalInPayment, text: 'En pagamento'},
                            {amount: this.stats.orderSummary.totalPaid, text: 'Pagadas'},
                            {amount: this.stats.orderSummary.totalClosed, text: 'Fechadas'},
                            {amount: this.stats.orderSummary.totalFinished, text: 'Concluídas'}
                        ]
                    },
                ];
                this.productsBestSellers = this.stats.mostSoldProducts;
                this.expenses = [
                    {
                        image: 'banking-4',
                        title: 'Food',
                        value: '79',
                        amount: '$702.00',
                        background: 'linear-gradient(-120deg, rgba(77, 182, 172, 1), rgba(77, 182, 172, 0.3) 70%)'
                    },
                    {
                        image: 'banking-5',
                        title: 'Electronics',
                        value: '62',
                        amount: '$421.60',
                        background: 'linear-gradient(-120deg, rgba(77, 182, 172, 1), rgba(77, 182, 172, 0.3) 70%)'
                    },
                    {
                        image: 'banking-6',
                        title: 'Utilities',
                        value: '45',
                        amount: '$388.51',
                        background: 'linear-gradient(-120deg, rgba(250, 183, 16, 1), rgba(250, 183, 16, 0.3) 70%)'
                    },
                    {
                        image: 'banking-7',
                        title: 'Clothing',
                        value: '41',
                        amount: '$295.72',
                        background: 'linear-gradient(-120deg, rgba(250, 183, 16, 1), rgba(250, 183, 16, 0.3) 70%)'
                    },
                    {
                        image: 'banking-8',
                        title: 'Travel',
                        value: '35',
                        amount: '$170.05',
                        background: 'linear-gradient(-120deg, rgba(198, 55, 55, 1), rgba(198, 55, 55, 0.3) 70%)'
                    },
                    {
                        image: 'banking-9',
                        title: 'Subscriptions',
                        value: '23',
                        amount: '$96.80',
                        background: 'linear-gradient(-120deg, rgba(198, 55, 55, 1), rgba(198, 55, 55, 0.3) 70%)'
                    },
                ];
            }

        });
    }

    applyFilter() {
        const startDate = formatDate(this.rangeDates[0]);
        const endDate = this.rangeDates[1] !== null ? formatDate(this.rangeDates[1]) : formatDate(this.rangeDates[0]);
        this.caixas.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
        this.store.loadOrdersStats({
            startDate,
            endDate
        });
        this.store.loadLowStock();
    }

    ngOnInit(): void {
        this.session.actualStore$.subscribe((store) => {
            if (store) {
                this.caixas.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                this.store.loadOrdersStats({
                    startDate: formatDate(this.rangeDates[0]),
                    endDate: formatDate(this.rangeDates[1])
                });
                this.store.loadLowStock();
            }
        })

        this.cashRegisterOperations.opened$.subscribe((opened) => {
            if (opened) {
                this.caixas.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
            }
        })

    }

    seeInfo(caixa: any): void {
        if (caixa.working) {
            this.cashRegisterOperations.getOperationsById(caixa.id);
            this.sidebarOption = 'info';
            this.sidebarVisible = true;
        } else {
            this.dialogService.open(MOpenCaixaComponents, {
                data: null,
                width: '300px',
            })
        }
    }

    historical(caixa: any): void {
        this.sidebarOption = 'historical';
        this.cashRegisterOperations.loadAll({
            lazy: {
                pageNumber: 0,
                pageSize: 100,
                cashRegisterId: caixa.id,
                startDate: formatDate(this.rangeDates[0]),
                endDate: formatDate(this.rangeDates[1])
            }
        })
        this.sidebarVisible = true;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getSeverity(operations: any) {
        if (operations.closingDate === null) {
            return 'warning';
        } else {
            return 'success'
        }
    }

    getValue(operations: any) {
        if (operations.closingDate === null) {
            return 'trabalhando';
        } else {
            return 'fechada'
        }
    }

    closingSidebar() {
        this.sidebarOption = 'info';
        this.cashOperations = null;
        this.historicalCashOperations = [];
    }
}
