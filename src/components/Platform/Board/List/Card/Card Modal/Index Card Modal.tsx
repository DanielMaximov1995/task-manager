'use client'
import {Dialog, DialogContent} from '@/components/ui/dialog'
import {CardModelType, ListModelType} from "@/types/Schema";
import { CustomEvent } from '@/types/others'
import { LayoutIcon } from '@/components/Icons'
import {ElementRef, useRef, useState} from "react";
import HeaderCardModal from "@/components/Platform/Board/List/Card/Card Modal/Header Card Modal";
import DescriptionCard from "@/components/Platform/Board/List/Card/Card Modal/Description Card";
import CardActions from "@/components/Platform/Board/List/Card/Card Modal/Card Actions";

export type CardModalProp = {
    isOpen ?: boolean;
    card : CardModelType;
    list ?: ListModelType;
    onClose ?: () => void
    handleChange ?: (name: string, value: string) => void
}

const CardModal = (props : CardModalProp) => {
    const { isOpen , card, list , onClose, handleChange } = props

    return (
        <div className='flex-row-reverse'>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <div className='flex flex-wrap'>
                            <HeaderCardModal list={list} card={card} handleChange={handleChange}/>
                    </div>
                    <div className='flex flex-wrap'>
                            <DescriptionCard card={card} handleChange={handleChange}/>
                    </div>
                    <div>
                        <CardActions card={card}/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default CardModal
