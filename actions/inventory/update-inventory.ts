import z from "zod";
import {InventorySchema} from "@/schema";
import {auth} from "@/auth";
import qs from "query-string";
import {revalidatePath} from "next/cache";

export const updateInventory = async (values:z.infer<typeof InventorySchema>,id:string)=> {
    const session = await auth();
    if(!session){
        return {error: "Unauthorized"}
    }
    if(!id){
        return {error: "Failed, product id is required"}
    }
    const validatedFields=InventorySchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }
    const {action,quantity} =  validatedFields.data;

    const value =action=="add"?quantity:quantity*-1;
    const url = qs.stringifyUrl({
        url: `${process.env.BACKEND_URL}/inventory/${id}`,
        query: {
            quantity: value.toString(),
        }
    })
    const hasPosted = await fetch(url,{
        method:"PUT",
        headers:new Headers({
            'Authorization': 'Bearer '+session.id_token,
            'Content-Type': 'application/json'
        }),
    }).then(function(response) {
        console.log(response.status); // Will show you the status
        if (response.ok) {
            revalidatePath('/products');
            return true;
        }
        return false;
    });
    return hasPosted?{success: "Product inventory has been updated"}:{error: "Failed, product inventory not updated"};
}