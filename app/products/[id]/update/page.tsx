import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Product, UpdateProductProps} from "@/types";
import {fetchProduct} from "@/actions/products";
import {UpdateProductForm} from "@/components/forms/update-product-form";

const Page = async ({params}: { params: UpdateProductProps }) => {
    const {id}=params;
    const product:Product = await fetchProduct(id);
    return (
        <div className={"flex items-center justify-center px-4 py-16"}>
            <div className="md:w-1/2 w-full sm:w-2/3">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Update Product
                        </CardTitle>
                        <CardDescription>
                            Edit product details including name,minimum stock level and description
                        </CardDescription>
                    </CardHeader>
                    <Separator/>
                    <CardContent>
                        <UpdateProductForm product={product}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Page;