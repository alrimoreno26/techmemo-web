import {AddressDTO} from "./supplier";

export interface CommerceDto {
    address?: AddressDTO
    amountTables?: number
    cnpj?: string
    config?: CommerceConfigDto
    created?: string
    description?: string
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
    menuType:  string
    scale: number
    theme: string
}