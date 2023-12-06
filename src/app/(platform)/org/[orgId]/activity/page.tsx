import {PageAndLayoutType} from "@/types/others";
import {getLogByOrg} from "@/services/fetch";
import {Metadata} from "next";
import {Fragment} from "react";
import LogCard from "@/components/Platform/Organization/Activity/Log Card";
import {LogModelType} from "@/types/Schema";

export const metadata : Metadata = {
    title : "פעילות"
}

const PageActivity = async (props : PageAndLayoutType) => {
    const { params } = props
    const getLogs = await getLogByOrg(decodeURIComponent(params?.orgId!))


    if(getLogs.length === 0) {
        return <div>
            <h2 className='h4 text-neutral-600 font-semibold'>אין פעילות לארגון !</h2>
        </div>
    }

    return (
        <div className='h-[36vw] overflow-y-auto'>
            {
                getLogs.map(( log : LogModelType, index : number ) => (
                    <div className='w-[380px] py-1' key={index}>
                        <LogCard log={log} user={log.user}/>
                    </div>
                ))
            }
        </div>
    )
}
export default PageActivity
