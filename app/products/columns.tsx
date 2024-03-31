"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Product} from "@/types";

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

]
