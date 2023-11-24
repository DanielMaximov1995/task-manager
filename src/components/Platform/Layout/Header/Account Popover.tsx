'use client'

import {UserModelType} from "@/types/Schema";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { signOut } from 'next-auth/react'
import {LogoutIcon, SettingIcon} from "@/components/Icons";
import Account from "./Account";
import { useRouter , redirect } from 'next/navigation'
import Link from "next/link";

const AccountPopover = ({ user } : { user : UserModelType | null | undefined }) => {
    const router = useRouter()

    return (
        <div className='py-2'>
            <div className='flex justify-start gap-x-4'>
                <Avatar className='h-14 w-14 text-xl'>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.fName?.slice(0 , 1)} {user?.lName?.slice(0 , 1)}</AvatarFallback>
                </Avatar>
                <div className="">
                    <p className="m-0 tracking-widest font-semibold text-lg">{user?.fullName}</p>
                    <p className="m-0 tracking-widest text-sm">שם החברה</p>
                </div>
            </div>
            <Account user={user}/>
            <div className='flex items-center my-6 gap-x-8 hover:bg-transparent px-4 cursor-pointer' onClick={() => signOut({redirect : false})}>
                <span className='text-gray-500'><LogoutIcon fontSize={20}/></span>
                <span className='text-lg font-normal'>התנתקות</span>
            </div>
        </div>
    )
}
export default AccountPopover
