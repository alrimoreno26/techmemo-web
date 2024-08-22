import {Options} from "../models";

export enum CommerceTypeEnum {
    INDUSTRY = 'INDUSTRY',
    PARENT = 'PARENT',
    SUBSIDIARY = 'SUBSIDIARY',
}

export enum PaymentTypeEnum {
    MONEY = 'MONEY',
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
    PIX = 'CREDIT',
    OTHERS = 'CREDIT',
}

export enum FinancialTransactionsEnum {
    TYPING = 'TYPING',
    PENDING_APPROVAL = 'PENDING_APPROVAL',
    APPROVED = 'APPROVED',
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
    CANCELED = 'CANCELED'
}

export enum BalanceAccountType {
    ACTIVE = 'ACTIVE',
    PASSIVE = 'PASSIVE',
    DRE = 'DRE'
}

export enum operatorCalculationTO {
    ADD = 'ADD',
    SUB = 'SUB',
    MULT = 'MULT',
    DIV = 'DIV'
}

export enum BankAccountType {
    CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
    DEPOSIT_ACCOUNT = 'DEPOSIT_ACCOUNT',
    PAYMENT_ACCOUNT = 'PAYMENT_ACCOUNT',
    SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
}

export enum currencyFormatEnum {
    NORMAL = 'NORMAL',
    THOUSANDS = 'THOUSANDS',
    MILLIONS = 'MILLIONS'
}

export const stateOptions: Options[] = [
    {name: 'summary.currencyView.NORMAL', value: currencyFormatEnum.NORMAL},
    {name: 'summary.currencyView.THOUSANDS', value: currencyFormatEnum.THOUSANDS},
    {name: 'summary.currencyView.MILLIONS', value: currencyFormatEnum.MILLIONS},
];

export const decimalPrecision: Options[] = [
    {name: '0', value: 0},
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
];

export enum calculationTypeAccountStructure {
    NO_CALCULATIONS = 'NO_CALCULATIONS',
    SUM_OF_ALL_SUBACCOUNTS = 'SUM_OF_ALL_SUBACCOUNTS',
    EQUATIONS = 'EQUATIONS',
    CONDITIONAL = 'CONDITIONAL'
}


export const flavorsEmun: any[] = [
    {name: 'morango', salePrice:0},
    {name: 'uva', salePrice:0},
    {name: 'chocolate', salePrice:0},
    {name: 'fresa', salePrice:0},
]
