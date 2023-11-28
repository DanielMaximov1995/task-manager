import React from 'react'
import {getBoardsById, getListByBordId, getOrganizationById, getOrganizationSlug} from "@/services/fetch";
import {PageAndLayoutType} from "@/types/others";
import BoardNavbar from "@/components/Platform/Board/Board Navbar";
import {notFound} from "next/navigation";

export const generateMetadata = async (props : PageAndLayoutType) => {
    const { params } = props
    const board = await getBoardsById(params?.boardId!)

    return {
        title: board?.title || "Board",
    };
}

const BoardLayout = async (props : PageAndLayoutType) => {
    const { params , children} = props
    const board = await getBoardsById(params?.boardId!)
    if (!board) {
        notFound();
    }
    const organization = await getOrganizationById(board?.orgId)

    return (
        <div
            className="relative h-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        >
            <BoardNavbar board={board} organization={organization}/>
            <div className="absolute inset-0 bg-black/10" />
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    );
}
export default BoardLayout
