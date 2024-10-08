export const ACCESS_TOKEN = 'secure_access_tech';
export const REFRESH_TOKEN = 'secure_refresh_tech';
export const DELETE_TOKEN = 'delete_refresh';

export enum domainEnum {
    ALL = 'ALL',
    USER = 'USER',
    ROLES = 'ROLES',
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
    KITCHEN = 'KITCHEN',
    REPORT = 'REPORT',
}

export const domainArray = Object.values(domainEnum);

export enum operationAreaRoleEnum {
    SUPER_ADMIN = 'SUPER_ADMIN',
    FACTORY_ADMINISTRATOR = 'FACTORY_ADMINISTRATOR',
    ACCOUNTS_TO_RECEIVE = 'ACCOUNTS_TO_RECEIVE',
    ACCOUNTS_TO_PAY = 'ACCOUNTS_TO_PAY',
    PERSONAL_DEPARTMENT = 'PERSONAL_DEPARTMENT',
    PRODUCTION = 'PRODUCTION',
    INVENTORY = 'INVENTORY',
    BUYER = 'BUYER',
    SALES = 'SALES',
    EXPEDITION = 'EXPEDITION',
    LOGISTICS = 'LOGISTICS',
    ADMINISTRATOR_STORE = 'ADMINISTRATOR_STORE',
    POINT_OF_SALE = 'POINT_OF_SALE',
    ATTENDANT = 'ATTENDANT',
    KITCHEN = 'KITCHEN',
    WAITER = 'WAITER'
}

export enum permissionAuthorityTOEnum {
    READ = 'READ',
    WRITE = 'WRITE',
    MODIFY = 'MODIFY',
    DELETE = 'DELETE',
}
