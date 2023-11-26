'use client'

import Logo from "@/components/Logo";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button"
import {useSession} from "next-auth/react";
import AccountPopover from "@/components/Platform/Layout/Header/Account Popover";
import {AddIcon} from "@/components/Icons";
import MobileSidebar from "@/components/Platform/Layout/Header/Mobile Sidebar";
import PlusIcon from "@/components/Icons/Plus Icon";
import {SideBarProps} from "@/components/Platform/Layout/Sidebar/Sidebar";

const NavbarPlatform = () => {
    const {data} = useSession()

    return (
        <header className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
            <MobileSidebar/>
            <div className='md:max-w-screen-2xl max-w-screen-xl mx-auto flex items-center w-full justify-between'>
                <Logo label='מנהל המשימות' size={30}/>
                <div className='space-x-4 md:block md:w-auto flex items-center md:justify-between justify-end  w-full'>
                    <div className='flex gap-x-4'>
                        <Button className="md:block hidden">חדש</Button>
                        <Button className="block md:hidden"><PlusIcon fontSize={25}/></Button>
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={data?.user?.avatar} />
                                    <AvatarFallback>{data?.user?.fName?.slice(0 , 1)} {data?.user?.lName?.slice(0 , 1)}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent><AccountPopover user={data?.user}/></PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default NavbarPlatform
