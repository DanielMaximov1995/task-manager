'use client'
import { redirect , usePathname ,useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {useEffect, FC} from 'react'
import {getOrganizationByEmail} from "@/services/fetch";
import {PageAndLayoutType} from "@/types/others";
import {useOrganization} from "@/hooks/use-Organization";
import Loading from "@/components/loading";

const RestrictedContent: FC<PageAndLayoutType> = (props) => {
    const { children, params } = props;
    const { status, data: sessionData } = useSession();
    const isLoadingAuth = status === "loading";
    const isLoginIn = status === "authenticated";
    const isNotLoginIn = status === "unauthenticated";
    const pathname = usePathname();
    const router = useRouter();
    const { onCreate } = useOrganization();
    let slug = decodeURIComponent(params?.orgId!)
    let lastOrg = typeof window !== 'undefined' ? localStorage.getItem('orgId') : null;

    useEffect(() => {
        const getNotLogin = () => {
            if (slug && slug !== "undefined") {
                return router.push('/sign-in');
            }

            if(pathname.includes('org')) {
                return router.push('/sign-in');
            }

            if (pathname.includes('sign-in') || pathname.includes('sign-up')) {
                return <>{children}</>;
            }
            return null;
        }
        if(isNotLoginIn) {
            getNotLogin()
        }
    },[isNotLoginIn])

    useEffect(() => {
        const getOrganization = async () => {
            let getMyOrganization = await getOrganizationByEmail()

            if (isLoginIn && getMyOrganization.length === 0 && pathname !== "/org") {
                await onCreate();
                !lastOrg ? router.push('/org') : router.push(`/org/${lastOrg}`);
                return null;
            }

            if (isLoginIn && (pathname.includes('sign-in') || pathname.includes('sign-up'))) {
                await onCreate();
                !lastOrg ? router.push('/org') : router.push(`/org/${lastOrg}`);
                return null;
            }

            if (isLoginIn && pathname === "/") {
                await onCreate();
                !lastOrg ? router.push('/org') : router.push(`/org/${lastOrg}`);
                return null;
            }

            await onCreate()
            return null;
        };

        if (isLoginIn) {
            getOrganization();
        }
    }, [sessionData?.user]);

    if (isLoadingAuth) {
        return <Loading/>
    }

    return <>{children}</>;
};
export default RestrictedContent;
