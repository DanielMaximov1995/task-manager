'use client'
import {cn} from "@/utils/shadcn-utils"
import {OrganizationModelType} from "@/types/Schema";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Image from 'next/image'
import {ActivityIcon, LayoutIcon, SettingIcon} from "@/components/Icons";
import {usePathname, useRouter} from "next/navigation";
import { Button } from '@/components/ui/button'

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: OrganizationModelType;
    onExpand: (id: string) => void
}

const NavItem = (props: NavItemProps) => {
    const {isActive, isExpanded, onExpand, organization} = props
    const router = useRouter()
    const pathname = usePathname()

    const routes = [
        { label : "לוחות" , icon : <span className='ml-2'><LayoutIcon fontSize={25}/></span> , href : `/org/${organization.slug}` },
        { label : "פעילות" , icon : <span className='ml-2'><ActivityIcon fontSize={25}/></span> , href : `/org/${organization.slug}/activity` },
        { label : "הגדרות" , icon : <span className='ml-2'><SettingIcon fontSize={25}/></span> , href : `/org/${organization.slug}/settings` },
    ]


    return (
        <AccordionItem value={organization?.slug} className='border-none'>
            <AccordionTrigger
                onClick={() => onExpand(organization?.slug)}
                className={`flex items-center gap-x-2 p-1.5 text-neutral-700 ${isActive && !isExpanded && "bg-sky-500/10 text-sky-700"} rounded-md hover:bg-neutral-500/10 effect text-start no-underline hover:no-underline`}
            >
            <div className='flex items-center gap-x-2'>
                <div className='w-7 h-7 relative'>
                    <Image fill src={organization.imageUrl} alt='organization' className='rounded-sm object-contain'/>
                </div>
                <span className='font-medium text-sm'>{organization.name}</span>
            </div>
            </AccordionTrigger>
            <AccordionContent className='pt-1 text-neutral-700'>
                {
                    routes.map((route , index) => (
                        <Button onClick={() => router.push(route.href)}
                                key={index}
                                size='sm'
                                className={`w-full font-normal ${pathname === route.href && "bg-sky-500/10 text-sky-700"} justify-start pr-10 mb-1`}
                                variant='ghost'
                        >
                            {route.icon}
                            {route.label}
                        </Button>
                    ))
                }
            </AccordionContent>
        </AccordionItem>
    )
}
export default NavItem
