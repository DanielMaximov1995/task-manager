'use client'

import {CardModelType, ListModelType} from "@/types/Schema";
import ListHeader from "@/components/Platform/Board/List/List Header";
import {ElementRef, useRef, useState} from "react";
import CardForm from "@/components/Platform/Board/List/Card/Card Form";
import {cn} from "@/utils/shadcn-utils";
import CardItem from "@/components/Platform/Board/List/Card/Card Item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type ListItemType = {
    index: number;
    list: ListModelType;
    cards : CardModelType[];
    orgId : string
}

const ListItem = (props: ListItemType) => {
    const {index, list , cards, orgId} = props
    const textArea = useRef<ElementRef<"textarea">>(null)
    const [editMode, setEditMode] = useState(false);


    const enableEditing = () => {
        setEditMode(true);
        setTimeout(() => {
            textArea.current?.focus();
        })
    };

    return (
        <Draggable draggableId={list?._id?.toString()!} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    dir='rtl'
                    className='shrink-0 h-full w-[272px] select-none'>
                    <div
                        {...provided.dragHandleProps}
                        className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
                    >
                        <ListHeader
                            onAddCard={enableEditing}
                            list={list}
                            orgId={orgId}
                        />
                        <Droppable droppableId={list?._id?.toString()!} type="card">
                            {(provided) => (
                                <ol
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={cn(
                                        "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                                        cards.length > 0 ? "mt-2" : "mt-0",
                                    )}
                                >
                                    {cards.map((card, index) => (
                                        <CardItem
                                            index={index}
                                            key={card?._id?.toString()!}
                                            card={card}
                                            list={list}
                                            orgId={orgId}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm
                            listId={list?._id?.toString()!}
                            card={list}
                            ref={textArea}
                            orgId={orgId}
                            editMode={editMode}
                            enableEditing={enableEditing}
                            disableEditing={() => setEditMode(false)}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    )
}
export default ListItem
