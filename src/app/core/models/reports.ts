export interface ReportsDTO {
    mostSoldProducts: MostSoldProductsDTO[],
    ordersByStates: OrdersByStateDTO,
    salesByPaymentStructures: SalesByPaymentStructureDTO[]
}

export interface MostSoldProductsDTO {
    id: string,
    name: string,
    total: 0,
    type: string
}

export interface OrdersByStateDTO {
    totalActive: 0,
    totalCancelled: 0,
    totalClosed: 0,
    totalFinished: 0,
    totalInPayment: 0,
    totalPaid: 0
}

export interface SalesByPaymentStructureDTO {
    paymentStructureDescription: string,
    paymentStructureId: string,
    value: 0
}
