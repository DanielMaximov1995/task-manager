'use client'
import Image from 'next/image'
import {OrgSettingsType} from "@/components/Platform/Organization/Settings/Main Settings Comp";
import { Skeleton } from '@/components/ui/skeleton'
import {Separator} from "@/components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const MainBoard = (props : OrgSettingsType) => {
    const { organization } = props

    return (
        <div className='w-full'>
            <div className="flex items-center gap-x-4">
                <div className="w-[60px] h-[60px] relative">
                    <Avatar className='w-16 h-16 rounded-md object-cover'>
                        <AvatarImage className="rounded-md object-cover" src={organization?.imageUrl} />
                        <AvatarFallback className='rounded-md'>{organization?.name.slice(0 , 1)}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-xl">
                        {organization?.name}
                    </p>
                </div>
            </div>
            <Separator className='my-4 w-full'/>
        </div>
    )
}
export default MainBoard
