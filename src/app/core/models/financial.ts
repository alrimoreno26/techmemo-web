export interface PaymentStructureTO {
    allowsChange: boolean,
    description: string,
    created?: string,
    id?: string,
    enable: boolean,
    mandatorySendCfe: boolean,
    requestAgreementInformation: boolean
}

export interface ClassifierDto {

    code: string;
    created: string;
    id?: string;
    name: string;
    type: 'BILLING' | 'EXPENSES'
}
