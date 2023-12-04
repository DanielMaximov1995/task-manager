'use client'
import { redirect , usePathname ,useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {useEffect, FC} from 'react'
import {getOrganizationByEmail} from "@/services/fetch";
import {PageAndLayoutType} from "@/types/others";
import {useOrganization} from "@/hooks/use-Organization";
import Loading from "@/components/loading";
import {OrganizationModelType} from "@/types/Schema";

type PropsTypeMember = {
    organization : OrganizationModelType
} & PageAndLayoutType

const RestrictedMemberContent = (props : PropsTypeMember) => {
    const { children, organization } = props;
    const { status, data: sessionData } = useSession();
    const isLoadingAuth = status === "loading";
    const isNotAuth = status === "unauthenticated";
    const router = useRouter();
    const checkMember = organization.members.includes(sessionData?.user?.email!)

    if(isLoadingAuth) {
        return <Loading/>
    }

    if(isNotAuth) {
        router.push('/org')
        return null
    }

    if(!checkMember) {
        router.push('/org')
        return null
    }

    return <>{children}</>;
};
export default RestrictedMemberContent;
