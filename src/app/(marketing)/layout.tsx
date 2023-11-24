import {PageAndLayoutType} from "@/types/others";
import Navbar from "@/components/Marketing/Navbar";
import Footer from "@/components/Marketing/Footer";

const MarketingLayout = (props: PageAndLayoutType) => {
    const {children} = props

    return (
        <div className='h-screen bg-slate-100'>
            <Navbar/>
            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>
            <Footer/>
        </div>
    )
}
export default MarketingLayout
