'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {PageAndLayoutType} from "@/types/others";
import NavItem from "@/components/Platform/Layout/Sidebar/nav-item";
import PlusIcon from "@/components/Icons/Plus Icon";
import {useParams, useRouter} from "next/navigation";
import {Accordion} from "@/components/ui/accordion";
import {useEffect, useState} from "react";
import {getOrganizationByEmail} from "@/services/fetch";
import {OrganizationModelType} from "@/types/Schema";
import {useOrganization} from "@/hooks/use-Organization";
import {Skeleton} from "@/components/ui/skeleton";

export type SideBarProps = {
    storageKey ?: string;
    slug ?: string;
} & PageAndLayoutType

const Sidebar = () => {
    const params = useParams()
    const slug : any = params?.orgId
    const { organizations, loading } = useOrganization();
    const [expanded, setExpanded] = useState(decodeURIComponent(slug));
    const router = useRouter()

    if(loading) {
        return (
            <>
                <div className='flex items-center justify-between mb-2'>
                    <Skeleton className='h-10 w-[50%]'/>
                    <Skeleton className='h-10 w-10'/>
                </div>
                <div className='space-y-2'>
                    <NavItem.Skeleton/>
                    <NavItem.Skeleton/>
                    <NavItem.Skeleton/>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='font-medium flex items-center mb-1'>
                <span className='pr-4 text-lg font-semibold'>חללי עבודה</span>
                <Button
                asChild
                type='button'
                size='icon'
                variant='ghost'
                className='mr-auto'
                >
                    <Link href='/org'>
                        <PlusIcon fontSize={30}/>
                    </Link>
                </Button>
            </div>
            <Accordion
            type='multiple'
            defaultValue={[expanded!]}
            className='apace-y-2'
            >
                {
                    organizations?.map((organization , index) => {
                        return <NavItem
                            key={organization?.slug}
                            isActive={decodeURIComponent(slug!) === organization.slug}
                            isExpanded={!!expanded}
                            organization={organization}
                            onExpand={() => setExpanded(organization?.slug)}
                        />
                    })
                }
            </Accordion>
        </>
    )
}
export default Sidebar
