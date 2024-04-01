"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";
import {useState, useTransition} from "react";
import {toast} from "@/components/ui/use-toast";
import {FormError} from "@/components/form-error";
import {InventorySchema} from "@/schema";
import {updateInventory} from "@/actions/inventory";


export const UpdateInventory = () => {
    const {isOpen, onClose, type, data} = useModal();

    const isModalOpen = isOpen && type === "updateInventory";
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const {product,inventoryAction} = data;
    const form = useForm<z.infer<typeof InventorySchema>>({
        resolver: zodResolver(InventorySchema),
        defaultValues: {
            action: "",
            quantity: 1
        }
    });
    if (!product) {
        return null;
    }
    function onSubmit(values: z.infer<typeof InventorySchema>) {
        setError("");
        startTransition(() => {
            if (product && values.action=="remove" && product?.currentStock<values.quantity){
                setError(`Stock balance is below ${values.quantity}`);
                return;
            }
            updateInventory(values, product?.id||"").then((data) => {
                setError(data?.error);
                if (data?.success) {
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
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle>
                        {product.name} {inventoryAction}
                    </DialogTitle>
                    <DialogDescription>
                        {inventoryAction==="add"?"Add product inventory":"Remove product inventory"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        <div className="space-y-4 p-6">
                            <FormError message={error}/>
                            <FormField
                                control={form.control}
                                name="action"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Add or Remove</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Add or remove" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="add">Add</SelectItem>
                                                <SelectItem value="remove">remove</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select to add or remove items from inventory
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                        >
                                            Quantity
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type={"number"}
                                                min={1}
                                                defaultValue={1}
                                                disabled={isPending}
                                                placeholder="Quamtity"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="py-4">
                                <Button className={"w-full"} disabled={isPending}>
                                    {isPending ? "Processing..." : "Update"}
                                </Button>
                            </DialogFooter>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}