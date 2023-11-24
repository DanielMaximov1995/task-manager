import React from 'react'
import {PageAndLayoutType} from "@/types/others";

const PlatformPage = (props : PageAndLayoutType) => {
    const { params } = props
    const orgId = params?.orgId

    return (
        <div>{orgId}</div>
    )
}
export default PlatformPage
