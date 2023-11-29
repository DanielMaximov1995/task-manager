'use client'

import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button"
import {useSession} from "next-auth/react";
import AccountPopover from "@/components/Platform/Layout/Header/Account Popover";
import MobileSidebar from "@/components/Platform/Layout/Header/Mobile Sidebar";
import PlusIcon from "@/components/Icons/Plus Icon";
import AddNewBoard from "@/components/Platform/Organization/Borad/Add New Board";
import {FormPopover} from "@/components/Form Popover";
import {getOrganizationByBoardId, getOrganizationSlug} from "@/services/fetch";
import {useEffect, useState} from "react";
import {OrganizationModelType} from "@/types/Schema";
import {redirect, useParams} from "next/navigation";
import Loading from "@/components/loading";
import {Skeleton} from "@/components/ui/skeleton";

type OrganizationTypeNav = "pending" | "not-found" | OrganizationModelType

const NavbarPlatform = () => {
    const {data , status} = useSession()
    const [organization, setOrganization] = useState<OrganizationTypeNav>("pending");
    const params = useParams()
    let orgId = decodeURIComponent(params?.orgId! as string)
    let boardId = decodeURIComponent(params?.boardId! as string)
    const authIsLoading = status === 'loading'

    useEffect(() => {
        const getOrganization = async () => {
            let data
            if(orgId && orgId !== "undefined") {
                data = await getOrganizationSlug(orgId)
            }
            if(boardId && boardId !== "undefined") {
                data = await getOrganizationByBoardId(boardId)
            }
            setOrganization(data)
        }

        getOrganization()
    },[params])

    let accountPopover = authIsLoading ? <Skeleton className='w-10 h-10 rounded-full'/> : <AccountPopover/>

    if(organization === "pending") {
        return <header className='fixed top-0 w-full z-high h-14 px-4 border-b shadow-sm bg-white flex items-center'>
            <div className='md:max-w-screen-2xl max-w-screen-xl mx-auto flex items-center w-full justify-between'>
                <Skeleton className='w-32 h-10'/>
                <div className='space-x-4 md:block md:w-auto flex items-center md:justify-between justify-end w-full'>
                    <div className='flex gap-x-4'>
                        <Skeleton className='w-20 h-10'/>
                        <Skeleton className='w-10 h-10 rounded-full'/>
                    </div>
                </div>
            </div>
        </header>
    }

    if(organization === "not-found") {
        return redirect('/org')
    }

    return (
        <header className='fixed top-0 w-full z-high h-14 px-4 border-b shadow-sm bg-white flex items-center'>
            <MobileSidebar/>
            <div className='md:max-w-screen-2xl max-w-screen-xl mx-auto flex items-center w-full justify-between'>
                <Logo label='מנהל המשימות' size={30}/>
                <div className='space-x-4 md:block md:w-auto flex items-center md:justify-between justify-end w-full'>
                    <div className='flex gap-x-4'>
                        <FormPopover sideOffset={18} align='start' side='bottom' formComp={<AddNewBoard organization={organization}/>}>
                            <div>
                                <Button className="md:block hidden">חדש</Button>
                                <Button className="block md:hidden"><PlusIcon fontSize={25}/></Button>
                            </div>
                        </FormPopover>
                        {accountPopover}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default NavbarPlatform
