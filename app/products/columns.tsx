"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Product} from "@/types";
import {ProductActions} from "@/app/products/_components/product-actions";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
    },
    {
        accessorKey: "minimumStockLevel",
        header: "Minimum Stock",
    },
    {
        accessorKey: "currentStock",
        header: "Current Stock",
    },
    {
        id: "action",
        cell: ({ row }) => {
            const product = row.original
            return (<ProductActions product={product}/>)
        },
    },

]
