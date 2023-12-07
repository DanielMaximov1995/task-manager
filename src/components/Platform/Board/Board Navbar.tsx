'use client'

import {BoardModelType, OrganizationModelType} from "@/types/Schema";
import BoardFormTitle from "@/components/Platform/Board/Board Form Title";
import {useSession} from "next-auth/react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {MoreHorizontalIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {toast} from "sonner";
import {addNewBoard, addNewLog, deleteBoard} from "@/services/fetch";
import {useRouter} from "next/navigation";

export type BoardNavBarType = {
    board: BoardModelType,
    organization: OrganizationModelType;
    isAdmin?: boolean
}

const BoardNavbar = (props: BoardNavBarType) => {
    const {board, organization} = props
    const {data : session} = useSession()
    const isAdmin = !!organization?.admin?.find(email => session?.user?.email === email)
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const onDelete = () => {
        setLoading(true)
        toast.promise(deleteBoard(board?._id?.toString()!), {
            loading: "מוחק את הלוח...",
            success: async (data) => {
                router.refresh()
                await addNewLog(`הלוח ${board.title} נמחק` , "delete" , board?._id?.toString()! , session?.user?._id?.toString()! , "board" , board?.orgId)
                router.push(`/org/${organization.slug}`)
                return data.message
            },
            error: (data) => {
                return data.message
            }
        })
        setLoading(false)
    }

    return (
        <div
            className='w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center justify-between px-6 gap-x-4 text-white'>
            <BoardFormTitle board={board} organization={organization} isAdmin={isAdmin}/>
            <Popover>
                <PopoverTrigger className='hover:bg-gray-100/10 rounded-full p-2'>
                    <MoreHorizontalIcon/>
                </PopoverTrigger>
                <PopoverContent>
                    <p className='text-lg text-center font-semibold'>אפשרויות</p>
                    <div className=''>
                        <Button onClick={onDelete} disabled={loading} variant='ghost'
                                className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
                            מחיקה
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
export default BoardNavbar
