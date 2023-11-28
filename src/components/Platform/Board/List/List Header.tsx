'use client'

import {ListModelType} from "@/types/Schema";
import {ElementRef, useRef, useState} from "react";
import {toast} from "sonner";
import {updateBoard, updateList} from "@/services/fetch";
import {useRouter} from "next/navigation";
import {useEventListener} from "usehooks-ts";
import ListOptions from "@/components/Platform/Board/List/List Options";

type ListHeaderType = {
    list : ListModelType;
    onAddCard : () => void
}

const ListHeader = (props : ListHeaderType) => {
    const { list, onAddCard } = props
    const [title, setTitle] = useState(list.title);
    const [editMode, setEditMode] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const router = useRouter()

    const enableEditing = () => {
        setEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const onSubmit = (formData : FormData) => {
        console.log(formData.get('title'))
        const titleFromData = formData.get("title") as string;
        if(titleFromData === title) {
           return setEditMode(false)
        }


        let updatedList = {
            ...list,
            title : titleFromData
        }
        toast.promise(updateList(list?._id?.toString()! , updatedList) , {
            loading : "מעדכן את שם הרשימה...",
            success : () => {
                router.refresh()
                setTitle(titleFromData)
                setEditMode(false)
                return "שם הרשימה התעדכן..."
            },
            error : (data) => {
                return data.message
            }
        })
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener("keydown", onKeyDown);

    return (
        <div
            className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'
        >
            {editMode ? (
                <form
                    ref={formRef}
                    action={onSubmit}
                    className="flex-1 px-[2px]"
                >
                    <input
                        ref={inputRef}
                        onBlur={onBlur}
                        name='title'
                        placeholder="Enter list title.."
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />
                    <button type="submit" hidden />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
                >
                    {title}
                </div>
            )}
            <ListOptions list={list} onAddCard={onAddCard}/>
        </div>
    )
}
export default ListHeader
