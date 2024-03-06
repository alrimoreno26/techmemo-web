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
    orderId: string
    paymentPerProducts:PaymentPerProductTO[];
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


