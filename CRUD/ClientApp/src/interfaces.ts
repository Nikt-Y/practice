export interface Product {
    id?: number,
    productName?: string,
    supplierID?: number,
    quantityPerUnit?: string,
    unitPrice?: number,
    unitsInStock?: number,
    unitsOnOrder?: number,
    reorderLevel?: number,
    discontinued?: boolean,
}

export interface columnInterface {
    title?: string,
    field?: string,
    show?: boolean,
    filter?: "boolean" | "numeric" | "text" | "date" | undefined,
    minWidth?: number,
    minGridWidth?: number,
    locked?: boolean,
    width?: string | number
}