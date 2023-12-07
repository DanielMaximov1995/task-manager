'use client'
import {AccountIcon} from "@/components/Icons"
import {Skeleton} from "@/components/ui/skeleton";
import {FormPopover} from "@/components/Form Popover";
import AddNewBoard from "@/components/Platform/Organization/Borad/Add New Board";
import {BoardModelType, OrganizationModelType} from "@/types/Schema";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

type BoardListType = {
    organization: OrganizationModelType;
    boards: BoardModelType[]
}

const BoardList = (props: BoardListType) => {
    const {organization, boards} = props
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    },[])

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-x-2 font-semibold text-lg text-neutral-700">
                <AccountIcon fontSize={25}/>
                <span>הלוחות שלך</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board) => (
                    <Link
                        key={board._id?.toString()!}
                        href={`/board/${board._id?.toString()!}`}
                        className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                        style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                        <p className="relative font-semibold text-white">
                            {board.title}
                        </p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side='left' formComp={<AddNewBoard organization={organization}/>}>
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                    >
                        <p className="text-sm">יצירת לוח חדש</p>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}
export default BoardList

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
            <Skeleton className="aspect-video h-full w-full p-2"/>
        </div>
    );
};