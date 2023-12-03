import {PageAndLayoutType} from "@/types/others";
import {getBoardsByOrgId, getOrganizationSlug} from "@/services/fetch";
import {OrganizationModelType} from "@/types/Schema";
import MainBoard from "@/components/Platform/Organization/Borad/Main Board";
import { Separator } from '@/components/ui/separator'
import BoardList from "@/components/Platform/Organization/Borad/Board List";
import { Suspense } from 'react'
import {Metadata} from "next";

export const dynamic = "force-dynamic"

export const generateMetadata  = async (props : PageAndLayoutType) => {
    const { params } = props
    const organization = await getOrganizationSlug(decodeURIComponent(params?.orgId!))

    return {
        title: {
            template : `מנהל המשימות • ${organization.name}`,
            default : organization.name
        }
    };
}

const OrgPage = async (props : PageAndLayoutType) => {
    const { params } = props
    const orgId = params?.orgId
    const organization : OrganizationModelType= await getOrganizationSlug(decodeURIComponent(orgId!))
    const boards = await getBoardsByOrgId(organization._id?.toString()!)

    return <div className='w-full mb-20'>
        <Suspense fallback={<BoardList.Skeleton/>}>
            <BoardList organization={organization} boards={boards}/>
        </Suspense>
    </div>
}
export default OrgPage
