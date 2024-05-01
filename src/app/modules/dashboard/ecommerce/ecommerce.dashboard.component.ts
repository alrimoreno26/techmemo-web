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

@Component({
    selector: 'c-commerce-dashboard',
    templateUrl: './ecommerce.dashboard.component.html'
})
export class EcommerceDashboardComponent implements OnInit, OnDestroy {

    stats: ReportsDTO;

    products: any[] = [];

    productsThisWeek: any[] = [];

    productsLastWeek: any[] = [];

    productsBestSellers: any[] = [];

    subscription!: Subscription;

    items: MenuItem[] = [];

    ordersChart: any;

    ordersChartOptions: any;

    revenueChart: any;

    revenueChartOptions: any;

    config!: AppConfig;

    metrics: any[] = [];

    expenses: any = [];

    caixasList: any = [];

    sidebarVisible: boolean;

    cashOperations: any = null;

    constructor(private layoutService: LayoutService,
                public store: StoreDashboardServices,
                public cashRegisterOperations: CashRegisterOperationsService,
                private dialogService: DialogService,
                private toastMessageService: ToastMessageService,
                public caixas: CashRegisterService,
                public session: SessionServices) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.config = config;
            this.initCharts();
        });

        effect(() => {
            if (this.cashRegisterOperations.selectedEntity$()) {
                this.cashOperations = this.cashRegisterOperations.selectedEntity$() as ChashRegisterSummaryDto
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
                            {amount: this.stats.orderSummary.totalFinished, text: 'Concluídas'},
                            {amount: this.stats.orderSummary.averageOrders, text: 'Média'}
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

    ngOnInit(): void {
        this.session.actualStore$.subscribe((store) => {
            if (store) {
                this.caixas.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
                this.store.loadOrdersStats({startDate: '2024-01-01', endDate: '2024-12-31'});
                this.store.loadLowStock();
            }
        })

        this.cashRegisterOperations.opened$.subscribe((opened) => {
            if(opened){
                this.caixas.loadAll({lazy: {pageNumber: 0, pageSize: 50}})
            }
        })
        if (this.session.getTenantId()) {
            this.store.loadLowStock();
            this.store.loadOrdersStats({startDate: '2024-01-01', endDate: '2024-12-31'});
            //
        }
        // this.productService.getProducts().then(data => {
        //     this.products = data;
        //     this.productsThisWeek = data;
        // });
        //
        // this.productService.getProductsMixed().then(data => this.productsLastWeek = data);

        this.initCharts();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.ordersChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'New',
                data: [2, 7, 20, 9, 16, 9, 5],
                backgroundColor: [
                    'rgba(100, 181, 246, 0.2)',
                ],
                borderColor: [
                    '#64B5F6',
                ],
                borderWidth: 3,
                fill: true,
                tension: .4
            }]
        };

        this.ordersChartOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: textColor
                    }
                }
            },
            hover: {
                mode: 'index'
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: [surfaceBorder],
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        min: 0,
                        max: 20
                    },
                    grid: {
                        color: [surfaceBorder],
                        drawBorder: false
                    }
                }
            }
        };

        this.revenueChart = {
            labels: ['Direct', 'Promoted', 'Affiliate'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#64B5F6', '#7986CB', '#4DB6AC'],
                borderColor: [surfaceBorder]
            }]
        };

        this.revenueChartOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: textColor
                    }
                }
            }
        }

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    changeDataset(event: any) {
        const dataSet = [
            [2, 7, 20, 9, 16, 9, 5],
            [2, 4, 9, 20, 16, 12, 20],
            [2, 17, 7, 15, 4, 20, 8],
            [2, 2, 20, 4, 17, 16, 20]
        ];

        this.ordersChart.datasets[0].data = dataSet[parseInt(event.currentTarget.getAttribute('data-index'))];
        this.ordersChart.datasets[0].label = event.currentTarget.getAttribute('data-label');
        this.ordersChart.datasets[0].borderColor = event.currentTarget.getAttribute('data-stroke');
        this.ordersChart.datasets[0].backgroundColor = event.currentTarget.getAttribute('data-fill');

    }

    recentSales(event: any) {
        if ((event.target as HTMLInputElement).value === '0') {
            this.products = this.productsThisWeek;
        } else {
            this.products = this.productsLastWeek;
        }
    }

    updateChartOptions() {
        if (this.config.colorScheme === 'dark')
            this.applyDarkTheme();
        else
            this.applyLightTheme();

    }

    applyDarkTheme() {
        this.ordersChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
    }

    applyLightTheme() {
        this.ordersChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };
    }

    seeInfo(caixa: any): void {
        if (caixa.working) {
            this.cashRegisterOperations.getOperationsById(caixa.id);
            this.sidebarVisible = true;
        } else {
            this.dialogService.open(MOpenCaixaComponents, {
                data: null,
                width: '300px',
            })
            //
        }

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
