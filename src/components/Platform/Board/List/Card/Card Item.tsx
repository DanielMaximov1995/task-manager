'use client'

import {CardModelType, ListModelType} from "@/types/Schema";
import {Draggable} from "@hello-pangea/dnd";
import CardModal from "@/components/Platform/Board/List/Card/Card Modal/Index Card Modal";
import {useState} from "react";
import {CustomEvent} from "@/types/others";

type CardItemType = {
    index : number;
    card : CardModelType;
    list : ListModelType;
    orgId : string
}

const CardItem = (props : CardItemType) => {
    const { index , card, list, orgId } = props
    const [cardEdit, setCardEdit] = useState<CardModelType | null>(null);
    const [cardForm, setCardForm] = useState<CardModelType>(card);

    const handleChange = (name : string, value : string) => {
        setCardForm(prev => ({
            ...prev,
            [name] : value
        }))
    }

    return (
        <>
        <Draggable draggableId={card?._id?.toString()!} index={index}>
            {
                (provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        role="button"
                        onClick={() => setCardEdit(card)}
                        className="truncate border-2 text-right border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
                    >{cardForm.title}
                    </div>
                )
            }
        </Draggable>
        <CardModal handleChange={handleChange} onClose={() => setCardEdit(null)} isOpen={cardEdit?._id === card._id} card={cardForm} list={list} />
        </>
    )
}
export default CardItem
