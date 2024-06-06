import {LightProductTO} from "./products";

export enum OrderState {
    ACTIVE, CLOSED, CANCELLED
}

export interface OrdersTO {
    clientDocument: string;
    clientName: string;
    code: string;
    created: string;
    id: string;
    state: OrderState
    totalValue: number;
    products?: LightProductTO[];
}

export interface CreateOrderTO {
    clientDocument: string,
    clientName: string,
    tableId?: string
}

export interface CreatePaymentTransactionTO {
    cashRegisterId: string
    orderId: string
    paymentPerProducts: PaymentPerProductTO[];
}

export interface PaymentPerProductTO {
    amount?: number
    payments: CreatePaymentTO[];
    productId?: string;
}

export interface CreatePaymentTO {
    discount: number;
    paymentStructureId?: string;
    valuePaid: number;
    valuePaidChange: number;
    valueToPaid: number;
}


export interface AdditionalLightTO {
    id: string;
    name: string | null;
    unitMeasurementCode: string | null;
    soldPerUnits: boolean;
    amount: number;
}

export interface ProductLightTO {
    id: string;
    name: string | null;
    unitMeasurementCode: string | null;
    soldPerUnits: boolean;
    amount: number;
    type: string | null;
    state: 'SENT_TO_KITCHEN' | 'IN_PREPARATION' | 'READY';
    code?: string;
    created?: string;
    additionals: AdditionalLightTO[];
}

export interface OrderLightTO {
    id: string;
    code: string;
    tableNumber: string | null;
    state: string;
    type: string;
    created: string;
    products: ProductLightTO[];
}
