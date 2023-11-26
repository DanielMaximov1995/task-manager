'use client'

import Image from "next/image";
import {ChevronIcon} from "@/components/Icons";
import { Button } from '@/components/ui/button'
import Link from "next/link";
import {PageAndLayoutType} from "@/types/others";
import {useOrganization} from "@/hooks/use-Organization";

const SelectOrg = () => {
    const { organizations } = useOrganization()


    return (
        <div className='flex flex-wrap'>
            <div className='p-2 py-4 w-full'>
                {
                    organizations?.map(org => (
                        <div key={org?._id?.toString()} className='py-1'>
                            <Link href={`/org/${org.slug}`} className='flex group items-center cursor-pointer bg-slate-100 rounded-md effect hover:bg-slate-200 p-2 justify-between'>
                                <div className='flex gap-x-4 items-center'>
                                    <div className='w-7 h-7 relative'>
                                        <Image fill src={org.imageUrl} alt='organization' className='rounded-sm object-contain'/>
                                    </div>
                                    <p className='text-neutral-800 text-md group-hover:font-semibold effect'>{org.name}</p>
                                </div>
                                <span className='text-neutral-400 group-hover:text-neutral-800 effect'><ChevronIcon position={"left"} fontSize={30}/></span>
                            </Link>
                        </div>
                    ))
                }

            </div>
            <div className="relative flex w-full p-2 items-center">
                <div className="flex-grow border-t-[0.5px] border-neutral-200"></div>
                <span className="flex-shrink mx-4 text-neutral-800">או</span>
                <div className="flex-grow border-t-[0.5px] border-neutral-200"></div>
            </div>
            <div className='w-full p-2'>
                <Button className='w-full text-lg' variant='outline' asChild>
                    <Link href='?addNew=true'>
                    סביבת עבודה חדשה
                    </Link>
                </Button>
            </div>
        </div>
    )
}
export default SelectOrg
