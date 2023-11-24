'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const AddOrg = () => {
    return (
        <div className='flex flex-wrap'>
            <div className='p-2 py-4 w-full'>
                <div className='flex'>
                    <Avatar>
                        <AvatarImage  className='bg-blue-500' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>
            </div>
        </div>
    )
}
export default AddOrg
