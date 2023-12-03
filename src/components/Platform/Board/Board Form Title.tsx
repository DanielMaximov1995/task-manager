'use client'

import {BoardNavBarType} from "@/components/Platform/Board/Board Navbar";
import {ElementRef, FormEvent, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {addNewLog, updateBoard} from "@/services/fetch";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

const BoardFormTitle = (props : BoardNavBarType) => {
    const { board, isAdmin } = props
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const [title, setTitle] = useState(board.title);
    const [editMode, setEditMode] = useState(false);
    const router = useRouter()
    const { data : session } = useSession()

    if(!isAdmin) {
        return <span className='text-lg font-bold text-white h-auto w-auto p-1 px-2 font-semibold tracking-widest'>{title}</span>
    }

    const enableEditing = () => {
        setEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    };

    const onSubmit = (formData : FormData) => {
        let updatedBoard = {
            ...board,
            title : formData.get("title") as string
        }
        toast.promise(updateBoard(board?._id?.toString()! , updatedBoard) , {
            loading : "מעדכן את שם הלוח...",
            success : async () => {
                setTitle(formData.get("title") as string)
                setEditMode(false)
                router.refresh()
                await addNewLog(`הרשימה ${title} נוספה ללוח ${board.title}` , "update" , board?._id?.toString()! , session?.user?._id?.toString()! , "board" , board?.orgId)
                return "שם הלוח התעדכן..."
            },
            error : (data) => {
                return data.message
            }
        })
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    if (editMode) {
        return <form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
            <input
                ref={inputRef}
                onBlur={onBlur}
                name='title'
                defaultValue={title}
                className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
            />
        </form>
    }

    return (
        <div>
            <Button onClick={enableEditing} variant='transparent' className='text-lg h-auto w-auto p-1 px-2 hover:bg-gray-100/10 p-2'>
                {title}
            </Button>
        </div>
    )
}
export default BoardFormTitle
