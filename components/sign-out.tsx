import React from 'react';
import {signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {FaPowerOff} from "react-icons/fa";

const SignOut = () => {
    return (
        <form action={async () => {
            "use server"
            await signOut();
        }}>
            <Button type={"submit"} variant={"link"} className={"flex items-center text-sm"}>
                <FaPowerOff className={"w-5 h-5 mr-3"}/> Logout
            </Button>
        </form>
    );
};

export default SignOut;