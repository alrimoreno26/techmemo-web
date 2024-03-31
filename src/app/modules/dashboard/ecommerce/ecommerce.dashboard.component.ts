import {Component, effect, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from 'src/app/demo/api/product';
import {AppConfig, LayoutService} from 'src/app/layout/service/app.layout.service';
import {ProductService} from 'src/app/demo/service/product.service';
import {Table} from 'primeng/table';
import {MenuItem} from 'primeng/api';
import {StoreDashboardServices} from "../services/dashboard.services";
import {ReportsDTO} from "../../../core/models/reports";

@Component({
    templateUrl: './ecommerce.dashboard.component.html'
})
export class EcommerceDashboardComponent implements OnInit, OnDestroy {

    stats: ReportsDTO;

    products: Product[] = [];

    productsThisWeek: Product[] = [];

    productsLastWeek: Product[] = [];

    productsBestSellers: Product[] = [];

    subscription!: Subscription;

    items: MenuItem[] = [];

    ordersChart: any;

    ordersChartOptions: any;

    revenueChart: any;

    revenueChartOptions: any;

    cols: any[] = [];

    config!: AppConfig;

    orderWeek: any[] = [];

    metrics: any[] = [];

    teamMembers: any[] = [];

    expenses: any = [];

    selectedOrderWeek!: any;

    constructor(private productService: ProductService, private layoutService: LayoutService, public store: StoreDashboardServices) {
        this.store.loadLowStock();
        this.store.loadOrdersStats({startDate : '2024-01-01', endDate: '2024-12-31'});
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.config = config;
            this.initCharts();
        });

        effect(() => {
            if(this.store.stat$()){
                this.stats = this.store.stat$();
                this.metrics = [
                    {
                        title: 'Orders',
                        icon: 'pi pi-shopping-cart',
                        color_light: '#64B5F6',
                        color_dark: '#1976D2',
                        textContent: [
                            {amount: this.stats.ordersByStates.totalActive, text: 'Ativas'},
                            {amount: this.stats.ordersByStates.totalFinished, text: 'Concluídas'}
                        ]
                    },
                    {
                        title: 'Revenue',
                        icon: 'pi pi-dollar',
                        color_light: '#7986CB',
                        color_dark: '#303F9F',
                        textContent: [
                            {amount: this.stats.ordersByStates.totalInPayment, text: 'En pagamento'},
                            {amount: this.stats.ordersByStates.totalPaid, text: 'Pagadas'}
                        ]
                    },
                    {
                        title: 'Customers',
                        icon: 'pi pi-users',
                        color_light: '#4DB6AC',
                        color_dark: '#00796B',
                        textContent: [
                            {amount: 8272, text: 'Active'},
                            {amount: 25402, text: 'Registered'}
                        ]
                    },
                    {
                        title: 'Comments',
                        icon: 'pi pi-users',
                        color_light: '#4DD0E1',
                        color_dark: '#0097A7',
                        textContent: [
                            {amount: 12, text: 'New'},
                            {amount: 85, text: 'Responded'}
                        ]
                    }
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
        this.productService.getProducts().then(data => {
            this.products = data;
            this.productsThisWeek = data;
        });

        this.productService.getProductsMixed().then(data => this.productsLastWeek = data);

        this.cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];

        this.items = [
            {
                label: 'Shipments',
                items: [
                    {label: 'Tracker', icon: 'pi pi-compass'},
                    {label: 'Map', icon: 'pi pi-map-marker'},
                    {label: 'Manage', icon: 'pi pi-pencil'}
                ]
            }
        ];

        this.orderWeek = [
            {name: 'This Week', code: '0'},
            {name: 'Last Week', code: '1'}
        ];

        this.teamMembers = [
            {
                name: 'Amy Elsner',
                desc: 'Accounting',
                image: 'amyelsner'
            },
            {
                name: 'Anna Fali',
                desc: 'Procurement',
                image: 'annafali'
            },
            {
                name: 'Bernardo Dominic',
                desc: 'Finance',
                image: 'bernardodominic'
            },
            {
                name: 'Ivan Magalhaes',
                desc: 'Sales',
                image: 'ivanmagalhaes'
            },
            {
                name: 'Xuxue Feng',
                desc: 'Management',
                image: 'xuxuefeng'
            }
        ];

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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
