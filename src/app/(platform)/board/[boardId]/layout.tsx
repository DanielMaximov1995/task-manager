import React from 'react'
import {PageAndLayoutType} from "@/types/others";
import dynamicNext from 'next/dynamic';
const BoardNavbar = dynamicNext(() => import("@/components/Platform/Board/Board Navbar") , { ssr : false });
import {notFound} from "next/navigation";

export const generateMetadata = async (props : PageAndLayoutType) => {
    const { params } = props
    try {
        const { getBoardsById } = await import('@/services/fetch');
        const board = await getBoardsById(params?.boardId!)

        return {
            title: board?.title || "לוח",
        };
    } catch (err) {
        return notFound()
    }
}

const BoardLayout = async (props : PageAndLayoutType) => {
    const { params , children} = props

    try {
        const { getBoardsById, getOrganizationById } = await import('@/services/fetch');
        const board = await getBoardsById(params?.boardId!)
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
    } catch (err) {
        return notFound()
    }
}
export default BoardLayout
