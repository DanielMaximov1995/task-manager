'use client'
import {Dialog, DialogContent} from '@/components/ui/dialog'
import {CardModelType, ListModelType} from "@/types/Schema";
import HeaderCardModal from "@/components/Platform/Board/List/Card/Card Modal/Header Card Modal";
import DescriptionCard from "@/components/Platform/Board/List/Card/Card Modal/Description Card";
import CardActions from "@/components/Platform/Board/List/Card/Card Modal/Card Actions";

export type CardModalProp = {
    isOpen ?: boolean;
    card : CardModelType;
    list ?: ListModelType;
    onClose ?: () => void
    handleChange ?: (name: string, value: string) => void;
    orgId : string;
}

const CardModal = (props : CardModalProp) => {
    const { isOpen , card, list , onClose, handleChange, orgId } = props

    return (
        <div className='flex-row-reverse'>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className='w-[380px] rounded-md'>
                    <div className='flex flex-wrap'>
                            <HeaderCardModal orgId={orgId} list={list} card={card} handleChange={handleChange}/>
                    </div>
                    <div className='flex flex-wrap'>
                            <DescriptionCard orgId={orgId} card={card} handleChange={handleChange}/>
                    </div>
                    <div className='flex flex-wrap'>
                            <CardActions card={card} onClose={onClose} list={list} orgId={orgId}/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default CardModal
