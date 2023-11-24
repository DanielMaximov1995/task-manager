'use client'
import { redirect , usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PageAndLayoutType } from '@/types/others';
import { Skeleton } from "@/components/ui/skeleton"

const RestrictedContentAuth = ({ children , fullback }: PageAndLayoutType) => {
    const { status } = useSession();
    const isLoadingAuth = status === "loading"
    const isLoginIn = status === "authenticated"
    const isNotLoginIn = status === "unauthenticated"
    const pathname = usePathname()

    if (isLoadingAuth) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    }

    if(isNotLoginIn) {
        return <>{fullback}</>
    }

    return <>{children}</>

};

export default RestrictedContentAuth;
