import {PageAndLayoutType} from "@/types/others";
import Logo from "@/components/Logo";
import RestrictedContent from "../../../components/RestrictedContent";
import Link from "next/link";
import {ChevronIcon} from "@/components/Icons";
import GoBack from "@/components/Go Back";

const AuthTemplate = (props: PageAndLayoutType) => {
    const {children , params} = props

    return (
        <RestrictedContent>
            <main className="pt-40 pb-20 bg-slate-100">
                <GoBack/>
                <div className='flex items-center justify-center flex-col'>
                    <div className='bg-white py-6 px-14 rounded-md shadow-md w-auto md:w-1/4'>
                        <div className='flex justify-center p-3'>
                            <Logo size={80}/>
                        </div>
                        {children}
                    </div>
                </div>
            </main>
        </RestrictedContent>
    )
}
export default AuthTemplate
