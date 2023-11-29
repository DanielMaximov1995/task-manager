'use client'

import {CardModalProp} from "@/components/Platform/Board/List/Card/Card Modal/Index Card Modal";
import {ElementRef, useRef, useState} from "react";
import {AlignIcon} from "@/components/Icons";
import {updateCard} from "@/services/fetch";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import { Button } from '@/components/ui/button'
import { cn } from "@/utils/shadcn-utils"

const DescriptionCard = (props: CardModalProp) => {
    const {card, handleChange} = props
    const [editMode, setEditMode] = useState(false);
    const descriptionRef = useRef<ElementRef<"textarea">>(null)
    const formRef = useRef<ElementRef<"form">>(null);
    const router = useRouter()
    const [showBtn, setShowBtn] = useState(false);


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

        if(!description) {
            return disableEditing()
        }

        toast.promise(updateCard({...card , description}),{
            loading : "מעדכן את תיאור הכרטיסיה...",
            success : () => {
                router.refresh()
                disableEditing()
                handleChange && handleChange("description" , description)
                return `עודכן התיאור לכרטיסייה ${card.title}`
            },
            error : (data) => {
                return data.message
            }
        })
    }

    return (
        <>
            <div className='pt-1'>
                <AlignIcon align='right' fontSize={20}/>
            </div>
            <div className='flex flex-wrap items-start'>
                    <p className='m-0 px-2 mr-1 text-base font-semibold'>תיאור</p>
                    <div className='w-full flex mt-1'>
                        <div className={cn(`w-80 transition-all duration-300 relative`, editMode ? "h-24" : "h-16")}>
                            {
                                editMode ?
                                    <form ref={formRef} className='mr-3' action={onSubmit}>
                                        <textarea ref={descriptionRef} defaultValue={card.description} id="description" name="description" placeholder="הוסף תיאור מפורט יותר..."  className='w-full h-16 rounded-md bg-neutral-300 pr-3 pt-2 tracking-wide outline-0 text-base placeholder-neutral-800 resize-none effect focus:text-base'/>
                                        <div className={cn(`flex justify-end gap-x-2 transition-all duration-300 -mt-12 opacity-0`,  showBtn && "mt-0 opacity-100")}>
                                        <Button size='sm' variant='ghost' onClick={disableEditing}>ביטול</Button>
                                        <Button size='sm'>שמירה</Button>
                                        </div>
                                    </form>
                                    : <div className='pr-3 pt-2 h-16 rounded-md mr-3 bg-neutral-300'  role='button' onClick={enableEditing}>
                                    <p className='m-0'>
                                    {card.description || "הוסף תיאור מפורט יותר..."}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
            </div>
        </>
    )
}
export default DescriptionCard
