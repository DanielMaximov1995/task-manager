'use client'

import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useSession} from "next-auth/react";
import RestrictedContentAuth from "@/components/RestrictedContentAuth";
import {redirect} from "next/navigation";

type ButtonOptions = {
    label: string;
    href: string;
};

const Navbar = () => {
    const { status } = useSession()
    const isLogin = status === "authenticated"

    const optionsButton: Record<string, ButtonOptions> = {
        "true": { label: "למנהלת המשימות", href: "/platform" },
        "false": { label: "התחברות", href: "/sign-in" }
    };


    if(isLogin) {
        return redirect('/org')
    }

    const ButtonOfNav = <Link href={optionsButton[isLogin.toString()]?.href} className='font-semibold'>
        {optionsButton[isLogin.toString()]?.label}
    </Link>;


    return (
        <header className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
            <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
                <Logo label='מנהל המשימות' size={30}/>
                <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
                    <Button size='sm' variant='outline' asChild>
                        <RestrictedContentAuth fullback={ButtonOfNav}>
                            <Link href={isLogin ? '/org' : '/sign-in'} className='font-semibold'>
                                { isLogin ? "למנהל המשימות" : "התחברות" }
                            </Link>
                        </RestrictedContentAuth>
                    </Button>
                </div>
            </div>
        </header>
    )
}
export default Navbar
