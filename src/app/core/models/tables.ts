export enum tableState {
    FREE = 'FREE',
    BUSY = 'BUSY',
    CLOSED = 'CLOSED',
    BUSY_WITH_UNION = 'BUSY_WITH_UNION'
}

export interface TableTO {
    created: string
    id: string
    number: number
    state: tableState
    totalValue: number
}
