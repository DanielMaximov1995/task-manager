import {PageAndLayoutType} from "@/types/others";
import {getBoardsById, getListByBordId} from "@/services/fetch";
import {ListModelType} from "@/types/Schema";
import dynamicNext from 'next/dynamic';
const ListContainer = dynamicNext(() => import("@/components/Platform/Board/List/List Container"), { ssr: false });

export const dynamic = "force-dynamic"

const BoardPage = async (props : PageAndLayoutType) => {
    const { params} = props
    const board = await getBoardsById(params?.boardId!)

    const list : ListModelType[] = await getListByBordId(board?._id)

    return (
        <div className='p-4 h-full overflow-x-auto'>
            <ListContainer lists={list.sort((a : any , b : any) => b.order - a.order)} boardId={params?.boardId!} board={board!}/>
        </div>
    )
}
export default BoardPage
