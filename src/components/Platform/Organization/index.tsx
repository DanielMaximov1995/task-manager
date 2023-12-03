'use client'
import React, {Suspense} from 'react'
import BoardList from "@/components/Platform/Organization/Borad/Board List";
import {BoardModelType, OrganizationModelType} from "@/types/Schema";

type IndexOrgProp = {
    organization : OrganizationModelType;
    boards : BoardModelType[];
}
const IndexOrganization = (props : IndexOrgProp) => {
    const { organization , boards } = props

    return (
        <Suspense fallback={<BoardList.Skeleton/>}>
            <BoardList organization={organization} boards={boards}/>
        </Suspense>
    )
}
export default IndexOrganization
