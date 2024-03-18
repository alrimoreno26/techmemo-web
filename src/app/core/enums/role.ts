export const ACCESS_TOKEN = 'secure_access';
export const REFRESH_TOKEN = 'secure_refresh';

export enum domainEnum {
    ALL  = 'ALL',
    SECURITY  = 'SECURITY',
    USER = 'USER',
    ROLES = 'ROLES',
    STORE = 'STORE',
    STORAGE = 'STORAGE',
    CONFIGURATION = 'CONFIGURATION',
    ACCOUNT_PLAN = 'ACCOUNT_PLAN',
    CATEGORY = 'CATEGORY',
    PRODUCT = 'PRODUCT',
    SUPPLIER = 'SUPPLIER',
    UNIT_MEASUREMENT = 'UNIT_MEASUREMENT',
    ORDER = 'ORDER',
    POS = 'POS',
    PAYMENT = 'PAYMENT',
    REPORT = 'REPORT',
}

export const domainArray = Object.values(domainEnum);

export enum operationAreaRoleEnum {
    BACKOFFICE = 'BACKOFFICE',
    CLIENT = 'CLIENT',
    ENTREPRENEUR = 'ENTREPRENEUR',
    PARTNER = 'PARTNER',
    SECURITY = 'SECURITY',
    CURATOR = 'CURATOR'
}

export enum permissionAuthorityTOEnum {
    READ = 'READ',
    WRITE = 'WRITE',
    MODIFY = 'MODIFY',
    DELETE = 'DELETE',
}
