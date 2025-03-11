/**
 * Representa uma transferência de estoque entre comércios.
 */
export interface StockTransferDto {
    /**
     * Identificador único da transferência
     */
    id: number;

    /**
     * Descrição ou observações sobre a transferência
     */
    description: string;

    /**
     * Data em que a transferência foi criada
     * (pode ser string ou Date, dependendo do back-end)
     */
    created: Date | string;

    /**
     * ID do comércio de origem
     */
    sourceCommerceId: number;

    /**
     * ID do comércio de destino
     */
    destinationCommerceId: number;

    /**
     * Lista de produtos incluídos na transferência
     */
    products: ProductStockTransferDto[];

    /**
     * Cantidad de elementos en la Lista de produtos incluídos na transferência
     */
    countProducts:number;
    /**
     * Valor total da transferência
     */
    totalPrice: number;
}

/**
 * Representa um produto dentro de uma transferência de estoque.
 */
export interface ProductStockTransferDto {
    /**
     * Identificador único deste registro de produto na transferência
     */
    id: number;

    /**
     * Identificador do produto
     */
    productId: number;

    /**
     * Nome do produto
     */
    productName: string;

    /**
     * Quantidade transferida
     */
    amount: number;

    /**
     * Valor unitário do produto
     */
    value: number;

    /**
     * Valor total (amount * value)
     */
    totalValue: number;

    /**
     * Código da unidade de medida (ex: 'UN', 'KG', etc.)
     */
    unitMeasurementCode: string;
}
