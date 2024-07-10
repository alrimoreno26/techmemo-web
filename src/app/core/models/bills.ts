import {
    BalanceAccountType,
    BankAccountType,
    calculationTypeAccountStructure,
    currencyFormatEnum, operatorCalculationTO
} from "../enums/commerce";

export interface BillLigthDto {
    amountPaymentInstallments: number
    classifier: ClassifierDto
    created: string;
    description: string;
    paymentInstallments?: CreateBillPaymentInstallmentDto[]
    firstPaymentInstallmentDate: string;
    id: string;
    monthlyPaymentInstallments: boolean
    paymentStructure: PaymentStructureLightDto;
    provision: number
    purchaseCode: string
    purchaseValue: number
    state: 'UNPAID' | 'IN_PAYMENT' | 'PAID';
    supplier: SupplierLightDto

}

export interface SupplierLightDto {
    document: string;
    email: string;
    id: string;
    lastName: string;
    name: string;
    phone: string;
    type: 'COMPANY' | 'PERSON'
}

export interface PaymentStructureLightDto {
    description: string
    id: string
    type: string
}

export interface ClassifierDto {
    code: string;
    created: string;
    id: string;
    name: string;
    type: string;
}


export interface CreateBillDto {
    classifierId: string
    description: string
    monthlyPaymentInstallments: boolean
    paymentInstallments: CreateBillPaymentInstallmentDto[]
    paymentStructureId: string
    provision: boolean
    purchaseCode: string
    supplierId: string
}

export interface CreateBillPaymentInstallmentDto {
    description: string
    expirationDate: string
    value: number
}

export interface BillSummaryDto {
    totalValuePaid: number;
    totalValueProvisionType: number;
    totalValuePay: number;
    totalValueToPay: number;
}

export interface BankAccount {
    accountNumber: number
    agency: string
    bank: string
    bankIspb: number
    id: string
    type: BankAccountType;
}



export interface BalanceStructureLightTO {
    created: string;
    description: string;
    enabled: boolean;
    id: string;
    inverted: boolean;
    pattern: boolean;
    organizationId: string;
    currencyFormat: currencyFormatEnum;
    decimalPrecision: number;
}


export interface CreateAccountStructureTO {
    accountId: string | null;
    baseForVA: boolean;
    calculationType: calculationTypeAccountStructure;
    parentAccountStructureId: string | null;
    position: number;
    prefix: string | null;
    sheet: boolean;
    suffix: string | null;
    visualize: boolean;
    nullableIfNotHavePreviousYear: boolean;
}

export interface AccountStructureTO extends CreateAccountStructureTO {
    created?: string;
    id?: string;
    name: string;
    type: BalanceAccountType;
    parent?: string
    classifierId?: string
    classifier?: any
}

export interface AccountEquationStructureTO {
    accountStructureId: string;
    calculations: CalculationTO[];
    created: string;
    id: string;
    operator: operatorCalculationTO;
}

export interface CalculationTO {
    accountId: string;
    classifierId?: string;
    classifier?: any;
    changeSignEndValue: boolean;
    constant: number;
    id?: string;
    name: string;
    operator: operatorCalculationTO;
    previousYears: number;
}

export interface BalanceFormatAccount {
    created: string;
    id: string;
    name: string;
    organizationId: string;
    parentAccountId: string | null;
    sheet: boolean;
    type: BalanceAccountType;
    calculationType: calculationTypeAccountStructure;
}
export interface StructNode extends AccountStructureTO {
    parent: string;
    nullableIfNotHavePreviousYear: boolean;
    structureData?: string;
    accountsId?: string;
    equations?: AccountEquationStructureTO[];
    conditionalEquations?: ConditionalAccountEquationStructureTO;
}
export interface ConditionalAccountEquationStructureTO {
    accountStructureId: string;
    anotherResultCaseCondition: AccountEquationStructureTO[];
    created: string;
    firstCondition: AccountEquationStructureTO[];
    id: string;
    operator: operatorConditionalTO;
    resultCaseCondition: AccountEquationStructureTO[];
    secondCondition: AccountEquationStructureTO[];
}
export enum operatorConditionalTO {
    LESSER = 'LESSER',
    GREATER = 'GREATER',
    EQUAL = 'EQUAL',
    LESSER_EQUAL = 'LESSER_EQUAL',
    GREATER_EQUAL = 'GREATER_EQUAL'
}
