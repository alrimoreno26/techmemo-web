import {domainEnum} from "../../../core/enums/role";

/**
 * List of menu sideBar
 */
export const menuList: any[] = [
    {
        label: 'Painel',
        icon: 'mdi mdi-monitor-dashboard mdi-24px',
        roles: [domainEnum.PRODUCT],
        routerLink: ['painel'],
    },
    {separator: true},
    {
        label: 'Inventário',
        icon: 'mdi mdi-alpha-i-box-outline mdi-24px',
        roles: [domainEnum.PRODUCT],
        items: [
            {
                label: 'Productos',
                roles: [domainEnum.PRODUCT],
                icon: 'mdi mdi-list-box-outline mdi-24px',
                routerLink: ['inventory/product']
            },
            {
                label: 'Categorias',
                roles: [domainEnum.CATEGORY,domainEnum.PRODUCT],
                icon: 'mdi mdi-sitemap-outline mdi-24px',
                routerLink: ['inventory/category']
            },
            {
                label: 'Proveedores',
                roles: [domainEnum.SUPPLIER,domainEnum.PRODUCT],
                icon: 'mdi mdi-card-account-details-outline mdi-24px',
                routerLink: ['inventory/proveedores']
            },
            // {
            //     label: 'Transferência de estoque',
            //     roles: [domainEnum.SUPPLIER],
            //     icon: 'mdi mdi mdi-swap-horizontal-bold mdi-24px',
            //     routerLink: ['inventory/transfer/estoque']
            // }
        ]
    },
    {separator: true},
    {
        label: 'Vendas',
        roles: [domainEnum.POS,domainEnum.ORDER,domainEnum.PRODUCT],
        icon: 'mdi mdi-cash-check mdi-24px',
        items: [
            {
                label: 'PDV',
                roles: [domainEnum.POS,domainEnum.ORDER,domainEnum.PRODUCT],
                icon: 'mdi mdi-point-of-sale mdi-24px',
                routerLink: ['vendas/historico']
            },
            {
                label: 'Vendas',
                roles: [domainEnum.POS,domainEnum.ORDER,domainEnum.PRODUCT],
                icon: 'mdi mdi-cash-plus mdi-24px',
                routerLink: ['vendas/loja']
            }
        ]
    },
    {separator: true},
    {
        label: 'Cozinha',
        icon: 'mdi mdi-chef-hat mdi-24px',
        roles: [domainEnum.KITCHEN,domainEnum.ALL],
        routerLink: ['cozinha'],
    },
    {separator: true},
    {
        label: 'Loja',
        icon: 'mdi mdi-office-building-outline mdi-24px',
        roles: [domainEnum.CONFIGURATION,domainEnum.PRODUCT],
        items: [
            {
                label: 'Lista',
                icon: 'mdi mdi mdi-storefront mdi-24px',
                roles: [domainEnum.CONFIGURATION],
                routerLink: ['loja/lista']
            },
            {
                label: 'Configurações',
                icon: 'mdi mdi-storefront-edit-outline mdi-24px',
                roles: [domainEnum.PRODUCT],
                routerLink: ['loja/configuration']
            }
        ]
    },
    {separator: true},
    {
        label: 'Compras',
        icon: 'mdi mdi-cash-multiple mdi-24px',
        roles: [domainEnum.PRODUCT],
        items: [
            {
                label: 'Contas a Pagar',
                roles: [domainEnum.PRODUCT],
                icon: 'mdi mdi-cash-clock mdi-24px',
                routerLink: ['compras/contas-pagar']
            },
            {
                label: 'Compras',
                roles: [domainEnum.PRODUCT],
                icon: 'mdi mdi-cash-multiple mdi-24px',
                routerLink: ['compras/lista']
            },
            // {
            //     label: 'Transferência',
            //     roles: [domainEnum.PRODUCT],
            //     icon: 'mdi mdi-truck-delivery mdi-24px',
            //     routerLink: ['transfer/lista']
            // }
        ]
    },
    {separator: true},
    {
        label: 'Financeiro',
        icon: 'mdi mdi-cash-register mdi-24px',
        roles: [domainEnum.CONFIGURATION],
        items: [
            {
                label: 'Classificação financeira',
                roles: [domainEnum.ALL],
                icon: 'mdi mdi-graph mdi-24px',
                routerLink: ['financial/financial-clasification']
            },
            {
                label: 'Balanço',
                roles: [domainEnum.ALL],
                icon: 'mdi mdi-cash-edit mdi-24px',
                routerLink: ['financial/balances']
            },
            {
                label: 'Estrutura Contábil',
                roles: [domainEnum.ALL],
                icon: 'mdi mdi-cash-check mdi-24px',
                routerLink: ['financial/structure-balances']
            },
            {
                label: 'Meios de pagamento',
                roles: [domainEnum.CONFIGURATION],
                icon: 'mdi mdi-cash-plus mdi-24px',
                routerLink: ['financial/payment-method']
            }
        ]
    },
    {separator: true},
    {
        label: 'Configurações',
        icon: 'mdi mdi-cog-outline mdi-24px',
        roles: [domainEnum.CONFIGURATION],
        items: [
            {
                label: 'Unidade Medida',
                icon: 'mdi mdi-filter-cog-outline mdi-24px',
                roles: [domainEnum.CONFIGURATION],
                routerLink: ['configurations/unidade']
            },
        ]
    },
    {separator: true},
    {
        label: 'Segurança',
        icon: 'mdi mdi-security mdi-24px',
        roles: [domainEnum.ROLES,domainEnum.PRODUCT],
        items: [
            {
                label: 'Usuario',
                icon: 'mdi mdi-account-edit mdi-24px',
                roles: [domainEnum.ROLES,domainEnum.PRODUCT],
                routerLink: ['security/user']
            },
            {
                label: 'Roles',
                icon: 'mdi mdi-shield-account mdi-24px',
                roles: [domainEnum.ROLES],
                routerLink: ['security/role']
            },
            {
                label: 'Domínios',
                icon: 'mdi mdi-account-key mdi-24px',
                roles: [domainEnum.ROLES],
                routerLink: ['security/domains']
            }
        ]
    }
]
