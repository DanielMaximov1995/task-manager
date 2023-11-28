import { notFound } from 'next/navigation'
import {PageAndLayoutType} from "@/types/others";
import {getBoardsById, getListByBordId} from "@/services/fetch";
import ListContainer from "@/components/Platform/Board/List/List Container";

export const dynamic = "force-dynamic"

const BoardPage = async (props : PageAndLayoutType) => {
    const { params} = props

    const board = await getBoardsById(params?.boardId!)

    if (!board) {
        notFound();
    }

    const list = await getListByBordId(board?._id)

    return (
        <div className='p-4 h-full overflow-x-auto'>
            <ListContainer lists={list} boardId={params?.boardId!}/>
        </div>
    )
}
export default BoardPage
