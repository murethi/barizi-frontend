import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {Button} from "@/components/ui/button";
import {Boxes, Edit, MoreHorizontal, Trash} from "lucide-react";
import {Product} from "@/types";
import Link from "next/link";
import {useModal} from "@/hooks/use-modal-store";


export const ProductActions = ({product}: { product:Product }) => {
    const {onOpen} = useModal();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"min-w-72"} align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                   
                    className="text-primary space-x-2 px-3 py-2 text-sm cursor-pointer"
                >
                    <Link className={"flex items-center justify-between w-full"} href={`/products/${product.id}/update`}>
                        Edit Details
                        <Edit className="h-4 w-4 ml-auto" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={()=>onOpen("updateInventory", {product})}
                    className="text-primary space-x-2 px-3 py-2 text-sm cursor-pointer"
                >
                    Update Inventory
                    <Boxes className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-rose-500 space-x-2 px-3 py-2 text-sm cursor-pointer"

                >
                    Delete Product (Permanent)
                    <Trash className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};
