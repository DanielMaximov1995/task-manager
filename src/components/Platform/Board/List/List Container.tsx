'use client'

import {ListModelType} from "@/types/Schema";
import ListForm from "@/components/Platform/Board/List/List Form";
import {list} from "postcss";
import {useEffect, useState} from "react";
import ListItem from "@/components/Platform/Board/List/List Item";

export type ListContainerType = {
    lists ?: ListModelType[];
    boardId : string;
}

const ListContainer = (props : ListContainerType) => {
    const { boardId, lists } = props
    const [orderedData, setOrderedData] = useState(lists);

    useEffect(() => {
        setOrderedData(lists)
    },[props])


    return (
        <ol className='flex gap-x-3 h-full '>
            {
                orderedData?.map((list , index) => (
                    <ListItem
                    key={list?._id?.toString()}
                    index={index}
                    list={list}
                    />
                ))
            }
            <ListForm boardId={boardId}/>
            <div className='flex-shrink-0 w-1'/>
        </ol>
    )
}
export default ListContainer
