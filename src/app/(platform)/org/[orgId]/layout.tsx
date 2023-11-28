import NavbarPlatform from "@/components/Platform/Layout/Header/Navbar";
import {PageAndLayoutType} from "@/types/others";
import RestrictedContent from "@/components/RestrictedContent";
import Sidebar from "@/components/Platform/Layout/Sidebar/Sidebar";
import {getOrganizationByEmail, getOrganizationSlug} from "@/services/fetch";

const LayoutOrg = async (props : PageAndLayoutType) => {
    const { children , params } = props
    const getOrg = await getOrganizationSlug(decodeURIComponent(params?.orgId!))

    return (
            <main className='px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto'>
                <div className='flex gap-x-7'>
                    <div className='w-72 pt-20 md:pt-24 shrink-0 px-2 hidden md:block h-screen shadow-[-10px_0px_12px_-6px_#0000000d]'>
                        <Sidebar/>
                    </div>
                <main className='pt-20 md:pt-24 px-2 md:px-10'>
                {children}
                </main>
                </div>
            </main>
    )
}
export default LayoutOrg
