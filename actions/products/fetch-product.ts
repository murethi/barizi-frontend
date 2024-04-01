import {auth, signOut} from "@/auth";
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

/**
 * fetch product by id
 * @param id
 */
export const fetchProduct = async (id:string)=> {
    const session = await auth();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if(!id){
        return {error: "Failed, product id is required"}
    }
    //backend base url is set on the env file
    return await fetch(`${process.env.BACKEND_URL}/products/${id}`,{
        headers:new Headers({
            'Authorization': 'Bearer '+session.id_token,
            'Content-Type': 'application/json'
        }),
    }).then(function(res) {
        if(res.ok){
            return res.json();
        }
        if(res.status==401){
            signOut();
            redirect("/");
        }
        return null;
    })
}