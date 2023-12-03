'use client'
import { useSession } from 'next-auth/react';
import { PageAndLayoutType } from '@/types/others';
import { Skeleton } from "@/components/ui/skeleton"

const RestrictedContentAuth = ({ children , fullback }: PageAndLayoutType) => {
    const { status } = useSession();
    const isLoadingAuth = status === "loading"
    const isNotLoginIn = status === "unauthenticated"

    if (isLoadingAuth) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    }

    if(isNotLoginIn) {
        return <>{fullback}</>
    }

    return <>{children}</>

};

export default RestrictedContentAuth;
