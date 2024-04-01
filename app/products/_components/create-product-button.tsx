"use client";

import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import React from "react";
import {useModal} from "@/hooks/use-modal-store";

export const CreateProductButton = ()=>{
    const {onOpen}=useModal();
    return (
        <Button onClick={()=>onOpen("createProduct")} >
            <PlusCircledIcon className={"mr-2"}/> <span>Create</span>
        </Button>
    )
}