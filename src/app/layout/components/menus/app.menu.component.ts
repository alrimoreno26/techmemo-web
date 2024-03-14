import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            // {
            //     label: 'Dashboards',
            //     icon: 'pi pi-home',
            //     items: [
            //         {
            //             label: 'E-Commerce',
            //             icon: 'pi pi-fw pi-home',
            //             routerLink: ['/dashboard-commerce']
            //         },
            //         {
            //             label: 'Banking',
            //             icon: 'pi pi-fw pi-image',
            //             routerLink: ['/dashboard-banking']
            //         }
            //     ]
            // },
            // { separator: true },
            {
                label: 'Inventário',
                icon: 'mdi mdi-alpha-i-box-outline mdi-24px',
                items: [
                    {
                        label: 'Productos',
                        icon: 'mdi mdi-list-box-outline mdi-24px',
                        routerLink: ['inventory/product']
                    },
                    {
                        label: 'Categorias',
                        icon: 'mdi mdi-sitemap-outline mdi-24px',
                        routerLink: ['inventory/category']
                    },
                    {
                        label: 'Proveedores',
                        icon: 'mdi mdi-card-account-details-outline mdi-24px',
                        routerLink: ['inventory/proveedores']
                    },
                ]
            },
            { separator: true },
            {
                label: 'Financeiro',
                icon: 'mdi mdi-cash-register mdi-24px',
                items: [
                    {
                        label: 'Meios de pagamento',
                        icon: 'mdi mdi-cash-plus mdi-24px',
                        routerLink: ['financial/payment-method']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Vendas',
                icon: 'mdi mdi-cash-check mdi-24px',
                items: [
                    {
                        label: 'Vendas',
                        icon: 'mdi mdi-cash-check mdi-24px',
                        routerLink: ['vendas/historico']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Loja',
                icon: 'mdi mdi-office-building-outline mdi-24px',
                items: [
                    {
                        label: 'Configurações',
                        icon: 'mdi mdi-office-building-cog-outline mdi-24px',
                        routerLink: ['loja/configuration']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Configurações',
                icon: 'mdi mdi-cog-outline mdi-24px',
                items: [
                    {
                        label: 'Unidade Medida',
                        icon: 'mdi mdi-filter-cog-outline mdi-24px',
                        routerLink: ['configurations/unidade']
                    },
                    {
                        label: 'Impresion',
                        icon: 'mdi mdi-printer-outline mdi-24px',
                        routerLink: ['configurations/category']
                    },
                ]
            },
            { separator: true },
            {
                label: 'Segurança',
                icon: 'mdi mdi-security mdi-24px',
                items: [
                    {
                        label: 'Autoridade',
                        icon: 'mdi mdi-shield-account mdi-24px',
                        routerLink: ['configurations/fornecedores']
                    },
                    {
                        label: 'Modules',
                        icon: 'mdi mdi-server-security mdi-24px',
                        routerLink: ['configurations/fornecedores']
                    },
                    {
                        label: 'Usuario',
                        icon: 'mdi mdi-account-edit mdi-24px',
                        routerLink: ['security/user']
                    },
                ]
            },
            // { separator: true },
            // {
            //     label: 'Hierarchy',
            //     icon: 'pi pi-fw pi-align-left',
            //     items: [
            //         {
            //             label: 'Submenu 1',
            //             icon: 'pi pi-fw pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 1.1.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         },
            //                         {
            //                             label: 'Submenu 1.1.2',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         },
            //                         {
            //                             label: 'Submenu 1.1.3',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 1.2.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2',
            //             icon: 'pi pi-fw pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 2.1.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         },
            //                         {
            //                             label: 'Submenu 2.1.2',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 2.2.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // { separator: true },
            // {
            //     label: 'Start',
            //     icon: 'pi pi-fw pi-download',
            //     items: [
            //         {
            //             label: 'Buy Now',
            //             icon: 'pi pi-fw pi-shopping-cart',
            //             url: ['https://www.primefaces.org/store']
            //         },
            //         {
            //             label: 'Documentation',
            //             icon: 'pi pi-fw pi-info-circle',
            //             routerLink: ['/documentation']
            //         }
            //     ]
            // }
        ];
    }
}
