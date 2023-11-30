'use client'
import {CardModalProp} from "@/components/Platform/Board/List/Card/Card Modal/Index Card Modal";
import { CopyIcon, SettingIcon, TrashIcon} from "@/components/Icons";
import {cloneCard, deleteCard, updateCard} from "@/services/fetch";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const CardActions = (props: CardModalProp) => {
    const { card, onClose, list } = props
    const router = useRouter()

    const onDelete = () => {
        toast.promise(deleteCard(card.listId! , card?._id?.toString()!),{
            loading : "מוחק את הכרטיסייה...",
            success : (data) => {
                router.refresh()
                onClose && onClose()
                return data.message
            },
            error : (data) => {
                return data.message
            }
        })
    }

    const onCloned = () => {
        toast.promise(cloneCard(card , list!),{
            loading : "משכפל את הכרטיסייה...",
            success : (data) => {
                router.refresh()
                onClose && onClose()
                return data.message
            },
            error : (data) => {
                return data.message
            }
        })
    }

    return (
        <div className='flex w-full flex-wrap'>
            <div className='pt-1 flex items-center'>
                <SettingIcon  fontSize={20}/>
                <p className='m-0 px-2 mr-1 text-base font-semibold'>פעולות</p>
            </div>
            <div className='w-full flex flex-wrap space-y-1 mt-1 mr-4'>
                    <div
                        onClick={onCloned}
                        className='w-full rounded-md flex items-center gap-x-1 text-lg font-semibold mr-2 tracking-wide pr-2 py-1 effect bg-neutral-300 hover:bg-neutral-200'
                        role='button'>
                        <CopyIcon/>
                        <span>שכפול</span>
                    </div>
                    <div
                        onClick={onDelete}
                        className='w-full rounded-md flex items-center gap-x-1 text-lg font-semibold mr-2 tracking-wide pr-2 py-1 effect bg-red-300 hover:bg-red-200'
                        role='button'>
                        <TrashIcon/>
                        <span>מחיקה</span>
                    </div>
            </div>
        </div>
    )
}
export default CardActions
