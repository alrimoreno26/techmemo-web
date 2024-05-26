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

