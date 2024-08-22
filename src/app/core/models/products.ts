import {CategoryDto} from "./category";
import {SupplierDTO} from "./supplier";
import {UnitsMeasurementsDTO} from "./units-measurements";
import {productType} from "../enums/product";

export interface ProductsCreateDto {
    additionalProducts: CreateProductAdditionalDto[]
    allowsAdditional: boolean
    barCode: string,
    categoryId: string,
    cfop: string,
    code: string,
    costPrice: number,
    cst: string,
    description: string,
    enable: boolean,
    name: string,
    ncm: string,
    quantityStockAlert: number,
    salePrice: number,
    showInMenu: boolean,
    soldPerUnits: boolean,
    supplierIds: string[],
    type: productType,
    unitMeasurementId: string,
    valuePerUnits: number;
    id?: string | number,
}

export interface DeleteOrderProductDto {
    description: string
    productIds: string[]
}

export interface StockProductReportTO {
    id: string,
    name: string,
    stockAmount: number,
    type: productType
}

export interface LightProductTO {
    amount: number,
    code: string,
    id: string,
    name: string,
    salePrice: number
}

export interface ProductDto {
    barCode: string,
    allowsFlavors?:boolean,
    allowsAdditional?:boolean,
    category: CategoryDto,
    cfop: string,
    code: string,
    costPrice: number,
    created: string,
    cst: string,
    description: string,
    enable: number,
    id: string,
    images: string,
    name: string,
    ncm: string,
    quantityStockAlert: number,
    salePrice: number,
    soldPerUnits: boolean,
    showInMenu: boolean,
    stockAmount: number,
    amount: number,
    suppliers: SupplierDTO[]
    unitMeasurement: UnitsMeasurementsDTO
    valuePerUnits: number,
}

export interface ProductFilterDto {
    cfop: string
    code: string
    costPrice: number,
    description: string
    id: string
    name: string
    type: productType,
    unitPrice: number,
}

export interface CreateProductAdditionalDto {
    id: string,
    valuePerUnits: number,
}

export interface ProductLightDto {
    description: string,
    id: string,
    name: string,
    type: productType,
    salePrice: number,
    totalAdditionalsValue: number,
    amount: number,
    weight: number,
}
