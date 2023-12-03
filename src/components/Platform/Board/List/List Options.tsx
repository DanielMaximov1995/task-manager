'use client'
import React, {ElementRef, useRef} from 'react'
import {ListModelType} from "@/types/Schema";
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {CloseIcon} from "@/components/Icons";
import {Separator} from "@/components/ui/separator";
import {toast} from "sonner";
import {addNewLog, cloneList, cloneListAndCards, deleteList} from "@/services/fetch";
import {list} from "postcss";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

type ListOptionsType = {
    list: ListModelType;
    onAddCard?: () => void;
    orgId : string
}

const ListOptions = (props: ListOptionsType) => {
    const {list, onAddCard , orgId} = props
    const router = useRouter()
    const closeRef = useRef<ElementRef<"button">>(null);
    const { data : session } = useSession()

    const onDelete = () => {
        toast.promise(deleteList(list?._id?.toString()!), {
            loading: "מוחק את הרשימה...",
            success: async (data) => {
                router.refresh()
                await addNewLog(`הרשימה ${list?.title} נמחקה` , "delete" , list?._id?.toString()! , session?.user?._id?.toString()! , "list", orgId )
                closeRef?.current?.click()
                return data.message
            },
            error: (data) => {
                return data.message
            }
        })
    }

    const onClone = () => {
        toast.promise(cloneListAndCards(list._id?.toString()!), {
            loading: "משכפל את הרשימה...",
            success: async (data) => {
                router.refresh()
                await addNewLog(`הרשימה ${list?.title} שוכפלה` , "add" , list?._id?.toString()! , session?.user?._id?.toString()! , "list" , orgId )
                closeRef?.current?.click()
                return data.message
            },
            error: (data) => {
                return data.message
            }
        })
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant='ghost'>
                    <MoreHorizontal/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='' side='bottom' align='start'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    אפשרויות הרשימה
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
                        <CloseIcon/>
                    </Button>
                </PopoverClose>
                <Button className='rounded-none w-full h-auto my-0.5 p-2 px-5 justify-start font-normal text-sm'
                        variant='ghost'
                    onClick={onAddCard}
                >
                    כרטיסיה חדשה...
                </Button>
                <Button className='rounded-none w-full h-auto p-2 my-0.5 px-5 justify-start font-normal text-sm'
                        variant='ghost' onClick={onClone}>
                    שכפול רשימה...
                </Button>
                <Separator/>
                <Button
                    className='rounded-none w-full h-auto my-0.5 p-2 px-5 justify-start font-normal text-sm'
                    variant='ghost'
                    onClick={onDelete}
                >
                    מחק רשימה
                </Button>
            </PopoverContent>
        </Popover>
    )
}
export default ListOptions
