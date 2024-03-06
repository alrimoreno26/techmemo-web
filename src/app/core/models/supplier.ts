import {ProductLightDto} from "./products";

export enum supplierType {
    COMPANY = 'COMPANY',
    PERSON = 'PERSON'
}

export interface SupplierDTO {
    address: AddressDTO;
    created: string;
    document: string;
    email: string;
    id: string;
    products?: ProductLightDto[];
    phone: string;
    type: supplierType
}

export interface SupplierCompanyDTO extends SupplierDTO {
    type: supplierType.COMPANY;
    socialReason: string;
    fantasyName: string;
}

export interface SupplierPersonDTO extends SupplierDTO {
    type: supplierType.PERSON;
    name: string;
    lastName: string;
    birthdate: string;
}

export interface AddressDTO {
    cep?: string;
    city: string;
    complement?: string;
    id?: string;
    neighborhood: string;
    number?: string;
    street: string;
    uf: string;
}
