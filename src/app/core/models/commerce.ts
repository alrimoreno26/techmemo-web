import {AddressDTO} from "./supplier";


export interface CommerceDto {
    address?: AddressDTO
    amountTables?: number
    cnpj?: string
    config?: CommerceConfigDto
    created?: string
    description?: string
    hasOnlineCommerce?: boolean
    enable?: boolean
    email?: string
    id?: string
    name?: string
    socialReason?: string
}


export interface CommerceConfigDto {
    colorSchemeType: string
    componentTheme: string
    created?: string
    id?: string
    menuType: string
    scale: number
    theme: string
}


export interface PrinterDto {
    area: 'POS' | 'KITCHEN'
    connectionByIp: boolean
    created: string
    enabled?: boolean
    id: string
    ip: string
    name: string
}

export interface CashRegisterDto {
    created?: string
    enabled: boolean
    id: string
    name: string
    working?: boolean
}


export interface ChashRegisterSummaryDto {
    id: string,
    openingValue: number,
    closingValue: number,
    totalSales: number,
    totalSalesPaymentWithMoney: number,
    totalSalesPaymentWithDebt: number,
    totalSalesPaymentWithCredit: number,
    totalSalesPaymentWithPix: number,
    totalSalesPaymentWithOthers: number,
    shiftTransactionBalance: number,
    opening: boolean,
    created: string,
    closingDate: string,
    adminUser: {
        id: string,
        name: string,
    },
    operatorUser: {
        id: string,
        name: string,
    }

}
