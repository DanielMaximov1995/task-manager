'use client'

import {ElementRef, forwardRef, useRef} from "react";
import {Button} from "@/components/ui/button";
import PlusIcon from "@/components/Icons/Plus Icon";
import {CloseIcon} from "@/components/Icons";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import FloatLabelTextArea from "@/components/Float Text/Float Label Text Area";
import {toast} from "sonner";
import {addNewCard} from "@/services/fetch";
import {useRouter} from "next/navigation";

type CardFormType =  {
    listId : any;
    editMode : boolean;
    enableEditing : () => void;
    disableEditing : () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement , CardFormType>((props, ref) => {
    const { listId, editMode, enableEditing, disableEditing } = props;
    const formRef = useRef<ElementRef<"form">>(null);
    const router = useRouter()

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        toast.promise(addNewCard({title } , listId),{
            loading : "מצרף כרטיסייה חדשה...",
            success : (data) => {
                disableEditing()
                router.refresh()
                return data.message
            },
            error : (data) => {
                return data.message
            }
        })
    };

    if(editMode) {
        return <form
            action={onSubmit}
            ref={formRef}
            className="m-1 py-0.5 px-1 space-y-4"
        >
            <textarea
            name='title'
            ref={ref}
            placeholder='כותרת עבור הכרטיסייה...'
            className="resize-none w-full focus-visible:ring-0 p-2 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
            />
            <div className="flex items-center gap-x-1">
            <Button>
                כרטיסייה חדשה
            </Button>
            <Button onClick={disableEditing} size="sm" variant="ghost">
                <CloseIcon fontSize={20}/>
            </Button>
            </div>
        </form>
    }

    return (
        <div className='pt-2 px-2'>
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                size="sm"
                variant="ghost"
            >
                <PlusIcon fontSize={20}/>
                כרטיסיה חדשה
            </Button>
        </div>
    )
})
export default CardForm

CardForm.displayName = "CardForm"