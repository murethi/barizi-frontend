import * as z from "zod";

/**
 * this file will hold the schema for different forms
 * this can then be imported anywhere on the project
 */
export const ProductSchema = z.object({
    name: z.string().min(1,{
        message:"Name is required"
    }),
    description: z.string().min(1,{
        message:"Description is required"
    }),
    minimumStockLevel: z.coerce.number().min(1,{
        message:"Must be 1 and above"
    }),
})

export const InventorySchema = z.object({
    action: z.string(),
    quantity: z.coerce.number().min(1,{
        message:"Must be 1 and above"
    }),
})