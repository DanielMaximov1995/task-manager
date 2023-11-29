'use client'

import {PageAndLayoutType} from "@/types/others";
import NavbarPlatform from "@/components/Platform/Layout/Header/Navbar";
import {usePathname} from "next/navigation";

const IndexLayout = (props: PageAndLayoutType) => {
    const {children} = props
    const pathname = usePathname()
    const hiddenNav = pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/org"

    return (
        <>
            {!hiddenNav && <NavbarPlatform/>}
            <div className='h-full'>
                {children}
            </div>
        </>
    )
}
export default IndexLayout
