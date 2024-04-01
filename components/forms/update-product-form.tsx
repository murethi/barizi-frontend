"use client";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductSchema} from "@/schema";
import {useState, useTransition} from "react";
import {toast} from "@/components/ui/use-toast";
import {createProduct, updateProduct} from "@/actions/products";
import {Textarea} from "@/components/ui/textarea";
import {useRouter} from "next/navigation";
import {Product} from "@/types";
export const UpdateProductForm = ({product}: { product:Product})=>{
    const router = useRouter();
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string|undefined>("");
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver:zodResolver(ProductSchema),
        defaultValues:{
            name:product.name,
            description:product.description,
            minimumStockLevel: product.minimumStockLevel,
        }
    });
    function onSubmit(values: z.infer<typeof ProductSchema>) {
        setError("");
        startTransition(()=>{
            updateProduct(values,product.id).then((data)=>{
                setError(data?.error);
                if(data?.success){
                    toast({
                        title: "Success",
                        description: data?.success,
                    })
                    return router.push('/products');
                }
            });
        })
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <div className="space-y-4 py-6">
                        <FormError message={error}/>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                    >
                                        Product name...
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="Enter product name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minimumStockLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                    >
                                        Minimum stock
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type={"number"}
                                            min={1}
                                            defaultValue={1}
                                            disabled={isPending}
                                            placeholder="Minimum stock level"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => <FormItem>
                                <FormLabel
                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                >
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isPending}
                                        className="text-black"
                                        placeholder="Enter description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                        />
                        <Button variant={"default"} disabled={isPending}>
                            {isPending?"Processing...":"Update"}
                        </Button>
                    </div>

                </form>
            </Form>
        </>
    )
}