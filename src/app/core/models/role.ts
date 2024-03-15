import {domainEnum, operationAreaRoleEnum, permissionAuthorityTOEnum} from "../enums/role";

export interface Role {
  id: number;
  authorities: Array<AuthorityTO>;
  code: string;
  description: string;
  name: string;
  operationArea: operationAreaRoleEnum;
  stringAuthorities: Array<string>;
}

export interface AuthorityTO {
  permission: permissionAuthorityTOEnum;
  id: number;
  domainDetail: DomainDetailTO;
}

export interface DomainDetailTO {
  id: number;
  description: string;
  domain: domainEnum;
}

export interface AuthMap {
  id: number;
  description: string;
  permission: permissionAuthorityTOEnum;
  type: domainEnum;
  value: boolean;
}
export interface Domains {
    id: number;
    description: string;
    DomainType: domainEnum;
}
