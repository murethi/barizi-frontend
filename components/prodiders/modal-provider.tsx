"use client";

import {useEffect, useState} from "react";
import {CreateProduct} from "@/components/modals/create-product";
import {UpdateInventory} from "@/components/modals/update-inventory";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (<>
        <CreateProduct/>
        <UpdateInventory/>
    </>)
}