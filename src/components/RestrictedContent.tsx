'use client'
import { redirect , usePathname ,useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {useEffect, useState, FC, ReactNode} from 'react'
import {OrganizationModelType} from "../types/Schema";
import {getAllOrganization, getOrganizationByEmail} from "../services/fetch";
import {PageAndLayoutType} from "@/types/others";

const RestrictedContent: FC<PageAndLayoutType> = (props) => {
    const { children, params } = props;
    const { status, data } = useSession();
    const isLoadingAuth = status === "loading";
    const isLoginIn = status === "authenticated";
    const isNotLoginIn = status === "unauthenticated";
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const getOrganization = async () => {
            let data = await getOrganizationByEmail();
            if (isLoginIn && data.length === 0 && pathname !== "/org") {
                router.push('/org');
                return null;
            }

            if (isLoginIn && (pathname.includes('sign-in') || pathname.includes('sign-up'))) {
                router.push(`/org/${data[0].slug}`);
                return null; // Terminate rendering after redirect
            }
            return null
        };

        if (data?.user) {
            getOrganization();
        }
    }, [isLoginIn]);

    if (isLoadingAuth) {
        return <></>;
    }

    if (isNotLoginIn) {
        if (params?.orgId) {
            return redirect('/sign-in');
        }

        if (pathname.includes('sign-in') || pathname.includes('sign-up')) {
            return <>{children}</>;
        }
        return null;
    }

    return <>{children}</>;
};

export default RestrictedContent;
