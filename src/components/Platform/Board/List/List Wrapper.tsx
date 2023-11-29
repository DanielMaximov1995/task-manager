'use client'

import {PageAndLayoutType} from "@/types/others";

const ListWrapper = (props : PageAndLayoutType) => {
    const { children } = props

    return (
        <li className="shrink-0 h-full w-[272px] select-none">
                {children}
        </li>
    )
}
export default ListWrapper
