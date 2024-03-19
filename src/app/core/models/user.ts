import {Role} from './role';

export interface FormAuth {
    email: string;
    password: string;
}

export interface SecurityModel{
    token: string;
    refreshToken: string;
    expirationDate?: string;
    refreshTokenExpirationDate?: string;
}
export interface UserAuthenticated {
    address?: AddressTO;
    completedQuestionnaire: boolean;
    confirmedEmail: boolean;
    confirmedPhone: boolean;
    cpf: string;
    created: string;
    email: string;
    enabled: boolean;
    hasRating: boolean;
    id: number;
    image: DocumentMetadataTO;
    name: string;
    phone: string;
    refreshToken: string;
    role: Role;
    token: string;
    totalCommissionReceivable: number;
    organizationId: string;
}

export interface DocumentMetadataTO {
    created: string;
    ext: string;
    id: number;
    name: string;
    url: string;
}

export interface AddressTO {
    id: number;
    address1?: string;
    address2?: string;
    borderMunicipality?: string;
    buildingType?: string;
    codeCountry?: string;
    codeMunicipality?: string;
    collectiveBuilding?: boolean;
    country?: string;
    deliveryRestriction?: boolean;
    formattedAddress?: string;
    latestAddress?: boolean;
    latitude?: number;
    longitude?: number;
    microRegion?: string;
    mregion?: string;
    municipality?: string;
    neighborhood?: string;
    number?: string;
    originalNeighborhood?: string;
    precision?: string;
    region?: string;
    registryUf?: string;
    residentialAddress?: boolean;
    rfPhones: Array<string>;
    uf?: string;
    zip?: string;
}

export interface RefreshTokenTO {
    token: string | null;
    refreshToken: string | null;
}
export interface User {
  id: number;
  bankAccounts: Array<BankAccountTO>;
  cpf: string;
  created: string;
  email: string;
  enabled: boolean;
  hasRating: boolean;
  name: string;
  phone: string;
  role: Role;
  totalCommissionReceivable: number;
}

export interface BankAccountTO {
  bankingAgency: string;
  bankingCc: string;
  bankingInstitution: string;
  enable: boolean;
  id: number;
  ownerId: string;
  ownerName: string;
}

export interface GeneratePassword {
  id: number;
  password: string;
}

export interface UpdatePassword {
  newPassword: string;
  oldPassword: string;
}

export interface LightUserTO {
  id: number;
  email: string;
  name: string;
  phone: string;
  roleName: string;
  cpf: string;
}
