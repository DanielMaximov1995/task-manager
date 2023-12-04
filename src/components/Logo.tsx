'use client'
import Image from 'next/image'
import Link from "next/link";
import {useSession} from "next-auth/react";

type LogoType = {
    size : number;
    label ?: string
}

const Logo = (props : LogoType) => {
    const { size , label } = props
    const { data, status } = useSession()
    const isLogin = status === "authenticated"
    let lastOrg = typeof window !== 'undefined' ? localStorage.getItem('orgId') : null;

    let href = lastOrg && isLogin ? `/org/${lastOrg}` : !lastOrg && isLogin ? '/org' : "/"

    return (
        <Link href={href}>
            <div className='hover:opacity-75 effect items-center gap-x-2 flex'>
                <Image src='/logo.png' alt='logo' height={size || 30} width={size || 30} />
                {label && <p className='text-lg text-neutral-700 hidden md:block font-semibold pb-1'>{label}</p>}
            </div>
        </Link>
    )
}
export default Logo
