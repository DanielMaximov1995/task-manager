import {PageAndLayoutType} from "@/types/others";
import {getOrganizationSlug} from "@/services/fetch";
import {OrganizationModelType} from "@/types/Schema";

const OrgPage = async (props : PageAndLayoutType) => {
    const { params } = props
    const orgId = params?.orgId
    const organization : OrganizationModelType= await getOrganizationSlug(decodeURIComponent(orgId!))

    return (
        <div>{organization.name}</div>
    )
}
export default OrgPage
