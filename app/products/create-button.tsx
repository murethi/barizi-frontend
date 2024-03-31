'use client'
import React from 'react';
import {Button} from "@/components/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";

const CreateButton = () => {

    return (
        <Button  className={"flex space-x-2"}><PlusCircledIcon/> <span>Create</span></Button>
    );
};

export default CreateButton;