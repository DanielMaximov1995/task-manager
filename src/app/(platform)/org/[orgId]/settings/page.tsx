import {PageAndLayoutType} from "@/types/others";
import {OrganizationModelType} from "@/types/Schema";
import {getOrganizationSlug} from "@/services/fetch";
import MainSettingsComp from "@/components/Platform/Organization/Settings/Main Settings Comp";
import {Metadata} from "next";

export const metadata : Metadata = {
    title : "הגדרות"
}

const OrgPageSettings = async (props : PageAndLayoutType) => {
    const { params } = props
    const orgId = params?.orgId
    const organization : OrganizationModelType= await getOrganizationSlug(decodeURIComponent(orgId!))

    return <MainSettingsComp organization={organization}/>
}

export default  OrgPageSettings