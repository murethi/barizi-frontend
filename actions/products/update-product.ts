import z from "zod";
import {ProductSchema} from "@/schema";
import {auth} from "@/auth";
import {revalidatePath} from "next/cache";

/**
 * updates a product
 * @param values
 * @param id
 */

export const updateProduct = async (values:z.infer<typeof ProductSchema>,id:string)=> {
    const session = await auth();
    if(!session){
        return {error: "Unauthorized"}
    }
    if(!id){
        return {error: "Failed, product id is required"}
    }
    const validatedFields=ProductSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    const hasPosted = await fetch(`${process.env.BACKEND_URL}/products/${id}`,{
        method:"PUT",
        headers:new Headers({
            'Authorization': 'Bearer '+session.id_token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(validatedFields.data),
    }).then(function(response) {
        console.log(response.status); // Will show you the status
        if (response.ok) {
            revalidatePath('/products');
            return true;
        }
        return false;
    });
    return hasPosted?{success: "Product has been updated"}:{error: "Failed, product not updated"};
}