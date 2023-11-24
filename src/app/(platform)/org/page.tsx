import GoBack from "@/components/Go Back";
import Logo from "@/components/Logo";
import RestrictedContent from "@/components/RestrictedContent";
import {PageAndLayoutType} from "@/types/others";
import SelectOrg from "@/components/Platform/Auth/Organization/Select-Org";
import AddOrg from "@/components/Platform/Auth/Organization/Add-Org";
import {getOrganizationByEmail} from "@/services/fetch";

const OrgPage = async (props : PageAndLayoutType) => {
    const { searchParams } = props
    let addNew  = (!!searchParams?.addNew).toString() as 'true' | 'false'
    let organization = await getOrganizationByEmail()

    const options = {
        true : { label : "יצירת ארגון חדש" , component : AddOrg },
        false : { label : "בחר ארגון כדי להמשיך" , component : SelectOrg },
    }

    let CurrentView = options[addNew].component

    return (
        <RestrictedContent>
            <main className="pt-40 pb-20 bg-slate-100">
                <GoBack/>
                <div className='flex items-center justify-center flex-col'>
                    <div className='bg-white py-6 px-14 rounded-md shadow-md w-auto md:w-1/4'>
                        <div className='flex justify-center p-3'>
                            <Logo size={80}/>
                        </div>
                        <p className='m-0 text-center font-semibold'>{options[addNew]!.label}</p>
                        <CurrentView/>
                    </div>
                </div>
            </main>
        </RestrictedContent>
    )
}
export default OrgPage
