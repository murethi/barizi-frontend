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
            <Button type={"submit"} variant={"link"} className={"flex items-center text-xs"}>
                <FaPowerOff className={"w-4 h-4 mr-2"}/> Logout
            </Button>
        </form>
    );
};

export default SignOut;