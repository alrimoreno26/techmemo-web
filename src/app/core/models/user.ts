import {Role} from './role';

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
