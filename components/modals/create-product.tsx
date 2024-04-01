"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";
import {useState, useTransition} from "react";
import {toast} from "@/components/ui/use-toast";
import {FormError} from "@/components/form-error";
import {ProductSchema} from "@/schema";
import {createProduct} from "@/actions/products";
import {Textarea} from "@/components/ui/textarea";


export const CreateProduct = () => {
    const { isOpen, onClose, type,data } = useModal();

    const isModalOpen = isOpen && type === "createProduct";
    const router = useRouter();

    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver:zodResolver(ProductSchema),
        defaultValues:{
            name:"",
            description:"",
            minimumStockLevel: 1,
        }
    });
    function onSubmit(values: z.infer<typeof ProductSchema>) {
        setError("");
        startTransition(()=>{
            createProduct(values).then((data)=>{
                setError(data?.error);
                if(data?.success){
                    toast({
                        title: "Success",
                        description: data?.success,
                    })
                    handleClose();
                }
            });
        })
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }
    return (
        <Dialog  open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle>
                        Create Product
                    </DialogTitle>
                    <DialogDescription>
                        Add a new product to store
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        <div className="space-y-4 p-6">
                            <FormError message={error}/>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                        >
                                            Product name
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
                            <DialogFooter className="py-4">
                                <Button className={"w-full"} disabled={isPending}>
                                    {isPending?"Processing...":"Create"}
                                </Button>
                            </DialogFooter>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}