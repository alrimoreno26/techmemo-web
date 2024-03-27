import {MenuItem} from "primeng/api";
import {domainEnum} from "../../../core/enums/role";

/**
 * List of menu sideBar
 */
export const menuList: any[] = [
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
                roles: [domainEnum.CATEGORY],
                icon: 'mdi mdi-sitemap-outline mdi-24px',
                routerLink: ['inventory/category']
            },
            {
                label: 'Proveedores',
                roles: [domainEnum.SUPPLIER],
                icon: 'mdi mdi-card-account-details-outline mdi-24px',
                routerLink: ['inventory/proveedores']
            },
            {
                label: 'Transferência de estoque',
                roles: [domainEnum.SUPPLIER],
                icon: 'mdi mdi mdi-swap-horizontal-bold mdi-24px',
                routerLink: ['inventory/transfer/estoque']
            }
        ]
    },
    {separator: true},
    {
        label: 'Financeiro',
        icon: 'mdi mdi-cash-register mdi-24px',
        roles: [domainEnum.CONFIGURATION],
        items: [
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
        label: 'Vendas',
        roles: [domainEnum.ORDER],
        icon: 'mdi mdi-cash-check mdi-24px',
        items: [
            {
                label: 'Vendas',
                roles: [domainEnum.ORDER],
                icon: 'mdi mdi-cash-check mdi-24px',
                routerLink: ['vendas/historico']
            }
        ]
    },
    {separator: true},
    {
        label: 'Compras',
        icon: 'mdi mdi-cash-multiple mdi-24px',
        roles: [domainEnum.PAYMENT],
        items: [
            {
                label: 'Compras',
                roles: [domainEnum.PAYMENT],
                icon: 'mdi mdi-cash-multiple mdi-24px',
                routerLink: ['compras/lista']
            }
        ]
    },
    {separator: true},
    {
        label: 'Loja',
        icon: 'mdi mdi-office-building-outline mdi-24px',
        roles: [domainEnum.CONFIGURATION],
        items: [
            {
                label: 'Configurações',
                icon: 'mdi mdi-storefront-edit-outline mdi-24px',
                roles: [domainEnum.CONFIGURATION],
                routerLink: ['loja/configuration']
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
            {
                label: 'Impresion',
                icon: 'mdi mdi-printer-outline mdi-24px',
                roles: [domainEnum.CONFIGURATION],
                routerLink: ['configurations/category']
            },
        ]
    },
    {separator: true},
    {
        label: 'Segurança',
        icon: 'mdi mdi-security mdi-24px',
        roles: [domainEnum.ROLES],
        items: [
            {
                label: 'Usuario',
                icon: 'mdi mdi-account-edit mdi-24px',
                roles: [domainEnum.ROLES],
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
