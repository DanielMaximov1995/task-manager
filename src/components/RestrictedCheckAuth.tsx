'use client'
import {useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import {PageAndLayoutType} from "@/types/others";
import Loading from "@/components/loading";

const RestrictedCheckAuth = (props : PageAndLayoutType) => {
    const { children } = props;
    const { status, data: sessionData } = useSession();
    const isLoadingAuth = status === "loading";
    const isNotAuth = status === "unauthenticated";
    const isAuth = status === "authenticated";
    const router = useRouter();


    if(isLoadingAuth) {
        return <Loading/>
    }

    if(isNotAuth) {
        return <>{children}</>
    }

    if(isAuth) {
        let lastOrg = typeof window !== 'undefined' ? localStorage.getItem('orgId') : null;
        lastOrg ? router.push(`/org/${lastOrg}`) : router.push('/org')
        return null
    }

    return <>{children}</>;
};
export default RestrictedCheckAuth;
