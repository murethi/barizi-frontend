export interface Product{
    id:string;
    name:string;
    description:string;
    minimumStockLevel:number;
    currentStock:number;
}

export interface UpdateProductProps{
    id:string;
}