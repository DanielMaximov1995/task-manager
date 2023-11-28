'use client'

import ListWrapper from "@/components/Platform/Board/List/List Wrapper";
import {Button} from "@/components/ui/button";
import PlusIcon from "@/components/Icons/Plus Icon";
import {ElementRef, FormEvent, useRef, useState} from "react";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import {ListContainerType} from "@/components/Platform/Board/List/List Container";
import {CloseIcon} from "@/components/Icons";
import {toast} from "sonner";
import {addNewList} from "@/services/fetch";
import FloatLabelText from "@/components/Float Label Text";
import FloatLabelTextSmall from "@/components/Float Label Text Small";
import {useRouter} from "next/navigation";


const ListForm = (props : ListContainerType) => {
    const { boardId } = props
    const formRef = useRef<ElementRef<"form">>(null);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const router = useRouter()

    const enableEditing = () => {
        setEditMode(true);
    };

    const disableEditing = () => {
        setEditMode(false);
        setTitle('')
    };



    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        };
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef,  disableEditing);

    const onSubmit = (e : FormEvent) => {
        e.preventDefault()
        let data = { title , boardId }

        toast.promise(addNewList(data) ,{
            loading : "מוסיף רשימה חדשה...",
            success : () => {
                disableEditing();
                router.refresh();
                return `הרשימה ${title} נוספה בהצלחה!`
            },
            error : (data) => {
                return data.message
            }
        })
    }

    if(editMode) {
        return <ListWrapper>
            <form onSubmit={onSubmit} ref={formRef} className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'>
                <input value={title} onChange={(e) => setTitle(e.target.value)} id='title' className="text-sm px-2 py-1 h-7 font-medium outline-0 border-transparent hover:border-input focus:border-[1px] transition"
                       placeholder="כותרת הרשימה..."/>
                <div className="flex items-center gap-x-1">
                    <Button size='sm'>
                        הוספת רשימה
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={disableEditing}
                    >
                        <CloseIcon fontSize={15}/>
                    </Button>
                </div>
            </form>
        </ListWrapper>
    }

    return (
        <ListWrapper>
            {/*<form className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'>*/}
                <Button
                    onClick={enableEditing}
                    className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 text-primary flex justify-start items-center font-medium text-sm"
                >
                    <PlusIcon fontSize={20}/>
                    רשימה חדשה
                </Button>
            {/*</form>*/}
        </ListWrapper>
    )
}
export default ListForm
