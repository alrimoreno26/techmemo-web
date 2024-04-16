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
    enable?: boolean
    id: string
    ip: string
    name: string
}
