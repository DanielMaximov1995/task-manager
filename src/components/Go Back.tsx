'use client'
import { Button } from '@/components/ui/button'
import {ChevronIcon} from "@/components/Icons";
import {useRouter} from "next/navigation";

const GoBack = () => {
    const router = useRouter()

    return (
        <Button onClick={() => router.back()} className='bg-neutral-300 effect hover:bg-neutral-600 text-neutral-600 hover:text-white absolute rounded-full'>
                <ChevronIcon position='right' fontSize={40}/>
        </Button>
    )
}
export default GoBack
