'use client'
import { useRouter } from 'next/navigation'
import React, {ElementRef, useRef, useState} from 'react'
import {CardModalProp} from "@/components/Platform/Board/List/Card/Card Modal/Index Card Modal";
import {LayoutIcon} from "@/components/Icons";
import {addNewLog, updateCard} from "@/services/fetch";
import {toast} from "sonner";
import {useSession} from "next-auth/react";

const HeaderCardModal = (props : CardModalProp) => {
    const { card , list , handleChange, orgId } = props
    const inputRef = useRef<ElementRef<"input">>(null);
    const router = useRouter()
    const { data } = useSession()

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    };

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;

        if (title === card.title) {
            return;
        }

        toast.promise(updateCard({...card , title}),{
            loading : "מעדכן את שם הכרטיסיה...",
            success : async () => {
                router.refresh()
                handleChange&& handleChange("title" , title)
                await addNewLog(`הכרטיסייה ${card.title} עודכה לשם ${title}` , "update" , list?._id?.toString()! , data?.user?._id?.toString()!, "list" , orgId )
                return `הכרטיסייה עודכנה עם השם ${title}`
            },
            error : (data) => {
                return data.message
            }
        })
    }

    return (
        <>

            <form action={onSubmit} className='flex flex-wrap items-start'>
                <div className='pt-1 flex items-center'>
                    <LayoutIcon fontSize={20}/>
                <input ref={inputRef} defaultValue={card.title} onBlur={onBlur} id='title' name='title' dir='rtl' className="text-lg px-2 mr-1 py-1 h-7 border-[1px] outline-0 font-semibold
                         border-transparent hover:border-[1px] hover:border-input focus:border-[1px] focus:border-neutral-800 transition"
                       placeholder="כותרת הרשימה..."/>
                </div>
                <p className='w-full m-0 p-0 px-3 text-sm text-muted-foreground mr-5'>ברשימה <span className='underline font-semibold'>{list?.title}</span></p>
            </form>
        </>
    )
}
export default HeaderCardModal
