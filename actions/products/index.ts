"use server"
import {auth, signOut} from "@/auth";
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

export const listProducts = async ()=> {
    const session = await auth();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    return await fetch(`${process.env.BACKEND_URL}/products`,{
        headers:new Headers({
            'Authorization': 'Bearer '+session.id_token,
            'Content-Type': 'application/x-www-form-urlencoded'
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