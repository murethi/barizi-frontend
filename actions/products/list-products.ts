import {auth, signOut} from "@/auth";
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

/**
 * Retrieves a list of all products
 */
export const listProducts = async ()=> {
    const session = await auth();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    return await fetch(`${process.env.BACKEND_URL}/products`,{
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
        console.log(res.status)
        return [];
    })
}