'use client'

import {CardModalProp} from "@/components/Platform/Board/List/Card/Card Modal/Index Card Modal";
import {ElementRef, useRef, useState} from "react";
import {AlignIcon} from "@/components/Icons";
import {addNewLog, updateCard} from "@/services/fetch";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import { Button } from '@/components/ui/button'
import { cn } from "@/utils/shadcn-utils"
import {useSession} from "next-auth/react";

const DescriptionCard = (props: CardModalProp) => {
    const {card, handleChange , orgId} = props
    const [editMode, setEditMode] = useState(false);
    const descriptionRef = useRef<ElementRef<"textarea">>(null)
    const formRef = useRef<ElementRef<"form">>(null);
    const router = useRouter()
    const [showBtn, setShowBtn] = useState(false);
    const { data } = useSession()

    const enableEditing = () => {
        setEditMode(true);
        setTimeout(() => {
            descriptionRef.current?.focus();
            descriptionRef.current?.select();
        });
        setTimeout(() => setShowBtn(true),100)
    }

    const disableEditing = () => {
        setEditMode(false);
        setShowBtn(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setEditMode(false);
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = async (formData: FormData) => {
        const description = formData.get("description") as string;

        if (description === card.description) {
            return;
        }

        if(!description && !card.description) {
            return disableEditing()
        }

        toast.promise(updateCard({...card , description}),{
            loading : "מעדכן את תיאור הכרטיסיה...",
            success : async () => {
                router.refresh()
                disableEditing()
                handleChange && handleChange("description" , description)
                await addNewLog(`עודכן תיאור לכרטיסיה ${card?.title}` , "update" , card?.listId! , data?.user?._id?.toString()! , "list" , orgId)
                return `עודכן התיאור לכרטיסייה ${card.title}`
            },
            error : (data) => {
                return data.message
            }
        })
    }

    return (
            <div className='flex w-full flex-wrap items-start'>
                <div className='pt-1 flex items-center'>
                    <AlignIcon align='right' fontSize={20}/>
                    <p className='m-0 px-2 mr-1 text-base font-semibold'>תיאור</p>
                </div>
                    <div className='w-full flex mt-1 mr-4'>
                        <div className={cn(`w-full transition-all duration-300 relative`, editMode ? "h-24" : "h-16")}>
                            {
                                editMode ?
                                    <form ref={formRef} className='mr-3' action={onSubmit}>
                                        <textarea ref={descriptionRef} defaultValue={card.description} id="description" name="description" placeholder="הוסף תיאור מפורט יותר..."  className='w-full h-16 rounded-md bg-neutral-300 pr-3 pt-2 tracking-wide outline-0 text-base placeholder-neutral-800 resize-none effect focus:text-base'/>
                                        <div className={cn(`flex justify-end gap-x-2 transition-all duration-300 -mt-12 opacity-0`,  showBtn && "mt-0 opacity-100")}>
                                        <Button size='sm' variant='ghost' onClick={disableEditing}>ביטול</Button>
                                        <Button size='sm'>שמירה</Button>
                                        </div>
                                    </form>
                                    : <div className={cn('pr-3 pt-2 h-auto rounded-md mr-3 bg-neutral-300', !card.description && "h-16")}  role='button' onClick={enableEditing}>
                                    <p className='m-0 whitespace-pre'>
                                    {card.description || "הוסף תיאור מפורט יותר..."}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
            </div>
    )
}
export default DescriptionCard
