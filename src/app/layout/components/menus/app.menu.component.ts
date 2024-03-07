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
                icon: 'pi pi-fw pi-wallet',
                items: [
                    {
                        label: 'Productos',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['inventory/product']
                    },
                    {
                        label: 'Categorias',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['inventory/category']
                    },
                    {
                        label: 'Proveedores',
                        icon: 'pi pi-fw pi-cart-plus',
                        routerLink: ['inventory/proveedores']
                    },
                ]
            },
            { separator: true },
            {
                label: 'Financeiro',
                icon: 'pi pi-fw pi-credit-card',
                items: [
                    {
                        label: 'Meios de pagamento',
                        icon: 'pi pi-fw pi-credit-card',
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
                        routerLink: ['vendas/histórico']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Loja',
                icon: 'pi pi-fw pi-building',
                items: [
                    {
                        label: 'Configurações',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['loja/configuration']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Configurações',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['configurations/fornecedores']
                    },
                    {
                        label: 'Unidade Medida',
                        icon: 'pi pi-fw pi-filter-fill',
                        routerLink: ['configurations/unidade']
                    },
                    {
                        label: 'Impresion',
                        icon: 'pi pi-fw pi-print',
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
