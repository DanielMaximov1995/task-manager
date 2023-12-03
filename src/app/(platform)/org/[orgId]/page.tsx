import {PageAndLayoutType} from "@/types/others";
import {getBoardsByOrgId, getOrganizationSlug} from "@/services/fetch";
import {OrganizationModelType} from "@/types/Schema";
import dynamicNext from 'next/dynamic';
const IndexOrganization = dynamicNext(() => import("@/components/Platform/Organization") , { ssr : false });
import {redirect} from "next/navigation";

export const dynamic = "force-dynamic"

export const generateMetadata  = async (props : PageAndLayoutType) => {
    const { params } = props
    const organization = await getOrganizationSlug(decodeURIComponent(params?.orgId!))

    if(!organization) {
        return redirect("/org")
    }

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

    if(!organization) {
        return redirect("/org")
    }

    return <div className='w-full mb-20'>
        <IndexOrganization organization={organization} boards={boards}/>
    </div>
}
export default OrgPage
