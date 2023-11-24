'use client'
import Image from 'next/image'
import Link from "next/link";

type LogoType = {
    size : number;
    label ?: string
}

const Logo = (props : LogoType) => {
    const { size , label } = props

    return (
        <Link href='/'>
            <div className='hover:opacity-75 effect items-center gap-x-2 hidden md:flex'>
                <Image src='/logo.png' alt='logo' height={size || 30} width={size || 30} />
                {label && <p className='text-lg text-neutral-700 font-semibold pb-1'>{label}</p>}
            </div>
        </Link>
    )
}
export default Logo
