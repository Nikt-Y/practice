interface columnInterface {
    title?: string,
    field?: string,
    show?: boolean,
    filter?: "boolean" | "numeric" | "text" | "date" | undefined,
    minWidth?: number,
    minGridWidth?: number,
    locked?: boolean,
    width?: string | number
}

const columns: Array<columnInterface> = [
    {
        title: 'Product ID',
        field: 'id',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Product Name',
        field: 'productName',
        show: true,
        filter: 'text'
    },
    {
        title: 'Supplier ID',
        field: 'supplierID',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Quantity Per Unit',
        field: 'quantityPerUnit',
        show: true,
        filter: 'text'
    },
    {
        title: 'Unit Price',
        field: 'unitPrice',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Units In Stock',
        field: 'unitsInStock',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Units In Stock',
        field: 'unitsOnOrder',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Units In Stock',
        field: 'reorderLevel',
        show: true,
        filter: 'numeric'
    },
    {
        title: 'Discontinued',
        field: 'discontinued',
        show: true,
        filter: 'boolean'
    }
];

export default columns;