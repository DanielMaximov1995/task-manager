import NavbarPlatform from "@/components/Platform/Layout/Header/Navbar";
import {PageAndLayoutType} from "@/types/others";
import RestrictedContent from "@/components/RestrictedContent";
import Sidebar from "@/components/Platform/Layout/Sidebar/Sidebar";
import { getOrganizationByEmail} from "@/services/fetch";

const Layout = async (props : PageAndLayoutType) => {
    const { children , params } = props
    const organizations = await getOrganizationByEmail()

    return (
        <RestrictedContent params={params}>
        <div>
            <NavbarPlatform/>
            <main className='pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto'>
                <div className='flex gap-x-7'>
                    <div className='w-64 shrink-0 hidden md:block'>
                        <Sidebar organizations={organizations} slug={params?.orgId}/>
                    </div>
                {children}
                </div>
            </main>
        </div>
        </RestrictedContent>
    )
}
export default Layout
