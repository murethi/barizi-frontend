import z from "zod";
import {ProductSchema} from "@/schema";
import {auth} from "@/auth";
import {revalidatePath} from "next/cache";

/**
 * creates a new product
 * @param values
 */
export const createProduct = async (values:z.infer<typeof ProductSchema>)=> {
    const session = await auth();
    if(!session){
        return {error: "Unauthorized"}
    }
    const validatedFields=ProductSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    const hasPosted = await fetch(`${process.env.BACKEND_URL}/products`,{
        method:"POST",
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
    return hasPosted?{success: "Product has been created"}:{error: "Failed, product not created"};
}