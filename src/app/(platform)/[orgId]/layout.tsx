import NavbarPlatform from "@/components/Platform/Layout/Header/Navbar";
import {PageAndLayoutType} from "@/types/others";
import RestrictedContent from "@/components/RestrictedContent";
import Sidebar from "@/components/Platform/Layout/Sidebar/Sidebar";

const Layout = (props : PageAndLayoutType) => {
    const { children , params } = props

    return (
        <RestrictedContent params={params}>
        <div>
            <NavbarPlatform/>
            <main className='pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto'>
                <div className='flex gap-x-7'>
                    <div className='w-64 shrink-0 hidden md:block'>
                        <Sidebar/>
                    </div>
                {children}
                </div>
            </main>
        </div>
        </RestrictedContent>
    )
}
export default Layout
