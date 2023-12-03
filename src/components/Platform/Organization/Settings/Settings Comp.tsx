'use client'
import {Button} from '@/components/ui/button'
import {OrgSettingsType} from "@/components/Platform/Organization/Settings/Main Settings Comp";
import {useSession} from "next-auth/react";
import AddEditOrg from "@/components/Platform/Auth/Organization/Add-Edit-Org";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {toast} from "sonner";
import {addNewLog, updateOrganization} from "@/services/fetch";
import {useRouter} from "next/navigation";
import {useOrganization} from "@/hooks/use-Organization";


const SettingsComp = (props: OrgSettingsType) => {
    const {organization} = props
    const {data : session} = useSession()
    const isAdmin = organization.admin?.find(emailMember => emailMember === session?.user?.email)
    const lastAdmin = isAdmin && organization.admin?.length === 1
    const router = useRouter()
    const { onUpdateOrganization } = useOrganization()

    const handleLeaveOrganization = () => {
        const updateOrg = {
            ...organization,
            members : organization.members.filter(member => member.toLowerCase() !== session?.user?.email?.toLowerCase()),
            admin : organization.members.filter(member => member.toLowerCase() !== session?.user?.email?.toLowerCase())
        }

        toast.promise(updateOrganization(organization.slug! , updateOrg),{
            loading : "מוציא אותך מהארגון...",
            success : async (data) => {
                onUpdateOrganization(organization.slug , updateOrg)
                await addNewLog(`${session?.user?.fullName} עזב את הארגון` , "delete" , organization?._id?.toString()! , session?.user?._id?.toString()! , "organization" , organization?._id?.toString()!)
                router.refresh()
                return "יצאת מהארגון!"
            },
            error : (data) => {
                return data.message
            }
        })
    }

    return (
        <div className='w-2/3 mx-auto'>
            <div>
                <p className='text-lg font-medium text-primary'>פרופיל הארגון</p>
            </div>
            {
                isAdmin ? <AddEditOrg organization={organization}/> : "show"
            }
            <div className=''>
                <p className='text-lg font-medium text-primary'>אבטחה</p>
                <div className='flex justify-between gap-x-4'>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger
                                onClick={handleLeaveOrganization}
                                className={`w-full border border-input rounded-md  text-md ${!!lastAdmin ? "cursor-default text-gray-400 border-gray-400" : "border-red-600 text-red-600 hover:bg-red-600/10 hover:text-red-600"}`}>
                                עזוב את הארגון
                            </TooltipTrigger>

                            {
                                !!lastAdmin &&
                                <TooltipContent side='bottom' className='py-0'>
                                    <p>אין עוד מנהלים בארגון</p>
                                </TooltipContent>
                            }
                        </Tooltip>
                    </TooltipProvider>
                    <Button variant='outline'
                            className='w-full border-red-600 text-red-600 hover:bg-red-600/10 text-md hover:text-red-600'>מחק
                        את הארגון</Button>
                </div>
            </div>
        </div>
    )
}
export default SettingsComp
