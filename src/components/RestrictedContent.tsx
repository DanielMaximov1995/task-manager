'use client'
import { redirect , usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PageAndLayoutType } from '@/types/others';

const RestrictedContent = ({ children , params }: PageAndLayoutType) => {
    const { status  } = useSession();
    const isLoadingAuth = status === "loading"
    const isLoginIn = status === "authenticated"
    const isNotLoginIn = status === "unauthenticated"
    const pathname = usePathname()

    if (isLoadingAuth) {
        return <></>;
    }


    if(isNotLoginIn){
        if(params?.orgId) {
            return redirect('/sign-in')
        }

        if(pathname.includes('sign-in') || pathname.includes('sign-up')) {
            return <>{children}</>
        }
        return null
    }



    if(isLoginIn && pathname.includes('sign-in') || pathname.includes('sign-up')) {
        return redirect('/adasd')
    }

    return <>{children}</>

};

export default RestrictedContent;
