'use client'

import {ListModelType} from "@/types/Schema";
import ListHeader from "@/components/Platform/Board/List/List Header";
import {ElementRef, useRef, useState} from "react";
import CardForm from "@/components/Platform/Board/List/Card/Card Form";

type ListItemType = {
    index : number;
    list : ListModelType
}

const ListItem = (props : ListItemType) => {
    const { index , list } = props
    const textArea = useRef<ElementRef<"textarea">>(null)
    const [editMode, setEditMode] = useState(false);

    const enableEditing = () => {
        setEditMode(true);
        setTimeout(() => {
            textArea.current?.focus();
        })
    };

    return (
        <li className='shrink-0 h-full w-[272px] select-none'>
            <div className='w-full rounded-md bg-[#f2f2f4] shadow-md pb-2'>
                <ListHeader onAddCard={enableEditing} list={list}/>
            <CardForm
                listId={list?._id?.toString()!}
                ref={textArea}
                editMode={editMode}
                enableEditing={enableEditing}
                disableEditing={() => setEditMode(false)}
            />
            </div>
        </li>
    )
}
export default ListItem
