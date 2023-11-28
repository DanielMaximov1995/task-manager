'use client'
import Image from 'next/image'
import {OrgSettingsType} from "@/components/Platform/Organization/Settings/Main Settings Comp";
import { Skeleton } from '@/components/ui/skeleton'

const MainBoard = (props : OrgSettingsType) => {
    const { organization } = props

    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image
                    fill
                    src={organization?.imageUrl!}
                    alt="Organization"
                    className="rounded-md object-cover"
                />
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">
                    {organization?.name}
                </p>
            </div>
        </div>
    )
}
export default MainBoard
