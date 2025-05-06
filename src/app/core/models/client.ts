export interface AddressDto {
    id: string;
    cep: string;
    city: string;
    complement: string;
    neighborhood: string;
    number: string;
    street: string;
    uf: string;
}

export interface ClientDto {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    created: string;
    address: AddressDto;
}
