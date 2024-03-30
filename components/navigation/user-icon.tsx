import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {FaPowerOff} from "react-icons/fa";
import {auth} from "@/auth";
import SignOut from "@/components/sign-out";

export const UserIcon = async () => {
    const session = await auth();
    if(!session){
        return ;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={"cursor-pointer"} asChild>
                <Avatar>
                    <AvatarImage src={session?.user?.image||""} alt="@shadcn" />
                    <AvatarFallback>{session?.user?.name?.substring(0,1)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    <p className={"text-sm"}>{session?.user?.name}</p>
                    <small className={"text-zinc-600 text-xs"}>{session?.user?.email}</small>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <SignOut/>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
