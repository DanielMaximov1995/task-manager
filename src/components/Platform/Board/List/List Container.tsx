"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import {ListModelType} from "@/types/Schema";
import ListItem from "@/components/Platform/Board/List/List Item";
import ListForm from "@/components/Platform/Board/List/List Form";
import {updateCardBetweenList, updateCardListOrder, updateListOrder} from "../../../../services/fetch";

export type ListContainerType = {
    lists: ListModelType[];
    boardId: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const ListContainer = (props : ListContainerType) => {
    const { boardId, lists } = props
    const [orderedData, setOrderedData] = useState(lists);

    useEffect(() => {
        setOrderedData(lists);
    }, [lists]);

    const onDragEnd = async (result: any) => {
        const { destination, source, type } = result;

            if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === "list") {
            const items = reorder(
                orderedData,
                source.index,
                destination.index,
            ).map((item, index) => ({ ...item, order: index }));

            setOrderedData(items);
            await updateListOrder(items)
        }

        if (type === "card") {
            let newOrderedData = [...orderedData];

            let sourceList = newOrderedData.find(list => list._id === source.droppableId);
            const destList = newOrderedData.find(list => list._id === destination.droppableId);

            if (!sourceList || !destList) {
                return;
            }

            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            if (!destList.cards) {
                destList.cards = [];
            }

            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index,
                );

                reorderedCards.forEach((card, idx) => {
                    card.order = idx;
                });

                sourceList.cards = reorderedCards;
                setOrderedData(newOrderedData);
                await updateCardListOrder(reorderedCards , source.droppableId)
            } else {
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                movedCard.listId = destination.droppableId;

                destList.cards.splice(destination.index, 0, movedCard);

                sourceList.cards.forEach((card, idx) => card.order = idx);

                destList.cards.forEach((card, idx) => {
                    card.order = idx;
                });

                setOrderedData(newOrderedData);
                let newList:ListModelType = newOrderedData.find(li => li._id === destination.droppableId)!
                let oldList :ListModelType = newOrderedData.find(li => li._id === source.droppableId)!
                await updateCardBetweenList(oldList , newList , movedCard)
            }
        }
    }

    return (
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="lists" type="list" direction="horizontal">
                    {(provided) => (
                        <ol
                            {...provided.droppableProps}
                            dir='ltr'
                            ref={provided.innerRef}
                            className="flex justify-end gap-x-3 h-full"
                        >
                            <ListForm boardId={boardId} lists={lists}/>
                            <div className="flex-shrink-0 w-1" dir='rtl' />
                            {orderedData?.map((list, index) => {
                                return (
                                    <ListItem
                                        key={list?._id?.toString()!}
                                        index={index}
                                        list={list}
                                        cards={list.cards!}
                                    />
                                )
                            })}
                            {provided.placeholder}
                        </ol>
                    )}
                </Droppable>
            </DragDropContext>
    );
};

export default ListContainer