import {PageAndLayoutType} from "@/types/others";
import {getOrganizationSlug} from "@/services/fetch";
import Sidebar from "@/components/Platform/Layout/Sidebar/Sidebar";
import MainBoard from "@/components/Platform/Organization/Borad/Main Board";
import {Suspense} from "react";
import Loading from "@/components/loading";
import {redirect} from "next/navigation";
import RestrictedMemberContent from "@/components/RestrictedMember";

export const generateMetadata  = async (props : PageAndLayoutType) => {
    const { params } = props
    const organization = await getOrganizationSlug(decodeURIComponent(params?.orgId!))

    if(!organization) {
        return redirect("/org")
    }

    return {
        title: {
            template : `%s • ${organization ? organization.name : "לא נמצא"}`,
            default : organization ? organization.name : "לא נמצא"
        }
    };
}

const LayoutOrg = async (props : PageAndLayoutType) => {
    const { children , params } = props
    let orgId = decodeURIComponent(params?.orgId!)
    const getOrg = await getOrganizationSlug(orgId)

    if(!getOrg) {
        return redirect("/org")
    }

    return (
        <RestrictedMemberContent organization={getOrg}>
            <main className='px-4 max-w-7xl 2xl:max-w-screen-2xl mx-auto'>
                <div className='flex gap-x-7'>
                    <div className='w-80 pt-20 md:pt-24 shrink-0 px-2 hidden md:block h-screen shadow-[-10px_0px_12px_-6px_#0000000d]'>
                        <Sidebar/>
                    </div>
                <main className='pt-20 md:pt-24 px-2 w-full md:px-10'>
                    <Suspense fallback={<Loading/>}>
                        <MainBoard organization={getOrg}/>
                        {children}
                    </Suspense>
                </main>
                </div>
            </main>
        </RestrictedMemberContent>
    )
}
export default LayoutOrg
