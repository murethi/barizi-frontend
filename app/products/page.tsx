import {columns} from "./columns"
import {DataTable} from "./data-table"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Metadata} from "next";
import {listProducts} from "@/actions/products";
import {Product} from "@/types";
import React from "react";
import {CreateProductButton} from "@/app/products/_components/create-product-button";

export const metadata: Metadata = {
    title: 'Products',
}
async function getData(): Promise<Product[]> {
    return await listProducts();
}

export default async function ProductPage() {
        const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <Card className="w-full">
                <CardHeader >
                    <div className={"flex items-center"}>
                        <div className={"flex-1"}>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>Manage or create products.</CardDescription>
                        </div>
                        <div >
                            <CreateProductButton/>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data}/>
                </CardContent>
            </Card>
        </div>
    )
}
