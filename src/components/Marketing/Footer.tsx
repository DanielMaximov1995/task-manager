'use client'

import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className='fixed bottom-0 w-full p-4 border-t bg-slate-100 flex items-center'>
            <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
                <Logo/>
                <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
                    <Button size='sm' variant='outline' asChild>
                        <Link href='/sign-in' className='font-semibold'>
                        התחברות
                        </Link>
                    </Button>
                </div>
            </div>
        </footer>
    )
}
export default Footer
