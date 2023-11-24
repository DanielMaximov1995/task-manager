'use client'
import { useLocalStorage } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {Accordion} from "@/components/ui/accordion";
import {PageAndLayoutType} from "@/types/others";
import NavItem from "@/components/Platform/Layout/Sidebar/nav-item";
import PlusIcon from "@/components/Icons/Plus Icon";
import {useEffect} from "react";

type SideBarProps = {
    storageKey ?: string;
    slug ?: string;
} & PageAndLayoutType

const Sidebar = (props : SideBarProps) => {
    const { storageKey = "t-sidebar-state" , organizations , slug} = props
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey , {})

    const defaultAccordionValue : string[] = Object.keys(expanded).reduce((acc : string[] , key : string) => {
        console.log(acc)
        if(expanded[key]) {
            acc.push(key)
        }
        return acc
    },[])

    const onExpanded = (slugItem : string) => {
        setExpanded((curr) => ({
            ...curr,
            [slugItem] : !expanded[slugItem]
        }))
    }

    return (
        <>
            <div className='font-medium text-xs flex items-center mb-1'>
                <span className='pr-4'>חללי עבודה</span>
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
            defaultValue={defaultAccordionValue}
            className='apace-y-2'
            >
                {organizations?.map((organization , index) => {
                    return <NavItem
                        key={organization?.slug}
                        isActive={decodeURIComponent(slug!) === organization.slug}
                        isExpanded={expanded[organization.slug]}
                        organization={organization}
                        onExpand={onExpanded}
                    />
                })}
            </Accordion>
        </>
    )
}
export default Sidebar
