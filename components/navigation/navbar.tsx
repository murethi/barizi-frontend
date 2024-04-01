import {auth} from "@/auth";
import Image from "next/image";
import {UserIcon} from "@/components/navigation/user-icon";
import Link from "next/link";
import {ClipboardIcon} from "@radix-ui/react-icons";

export const Navbar =async ()=>{
    const session = await auth();
    if(!session){
        return ;
    }
    return (
        <nav className={"flex items-center justify-between px-2 shadow-md py-1"}>
            <div>
                <a href="/products">
                    <Image width={120} height={80} src={'/logo-clear.png'} alt={"Barizi Communications"}/>
                </a>
            </div>
            <ul className={"text-sm text-zinc-600 flex space-x-3 "}>
                <li>
                    <Link className={"hover:underline hover:text-blue-600 flex items-center space-x-1"} href={"/products"}><ClipboardIcon className={"w-4 -h-4"}/> <span>Products</span></Link>

                </li>
            </ul>
            <div>
                <UserIcon/>
            </div>
        </nav>
    );
}