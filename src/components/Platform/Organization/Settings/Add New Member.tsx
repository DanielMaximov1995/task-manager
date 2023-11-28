'use client'
import {useState} from 'react'
import {OrganizationModelType} from "@/types/Schema";
import {CustomEvent} from "@/types/others";
import {Checkbox} from "@/components/ui/checkbox"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from '@/components/ui/button'
import FloatLabelText from "@/components/Float Label Text";
import {toast} from "sonner";
import {updateOrganization} from "@/services/fetch";
import {useOrganization} from "@/hooks/use-Organization";
import {useRouter} from "next/navigation";

type AddNewMemberType = {
    organization: OrganizationModelType
}

const AddNewMember = (props: AddNewMemberType) => {
    const {organization} = props
    const initialState= {
        email: "",
        isAdmin: false
    }
    const [newMember, setNewMember] = useState(initialState);
    const { onUpdateOrganization } = useOrganization()
    const router = useRouter()

    const handleChecked = (e : boolean) => {
        setNewMember(prev => ({
            ...prev,
            isAdmin : e
        }))
    }

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target

        setNewMember(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        const memberExist = organization.members.find(member => member.toLowerCase() === newMember.email.toLowerCase())

        if(!newMember.email) {
            return toast.error('חובה לרשום דוא"ל!')
        }

        if(memberExist) {
            return toast.error('הדוא"ל קיים בארגון!')
        }

        let updatedOrg = {
            ...organization,
            members : [...organization.members, newMember.email.toLowerCase()],
            admin : newMember.isAdmin ? [...organization.members, newMember.email.toLowerCase()] : organization.admin
        }

        toast.promise(updateOrganization(organization.slug , updatedOrg),
            {
                loading : "מוסיף שותף חדש...",
                success : () => {
                    onUpdateOrganization(organization.slug , updatedOrg)
                    setNewMember(initialState)
                    router.refresh()
                    return "השותף נוסף בהצלחה!"
                },
                error : (data) => {
                    return data.message
                }
            })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button>הוסף חדש</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle dir='rtl' className='text-center'>הוספת שותף חדש</AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <FloatLabelText
                                handleChange={handleChange}
                                name="email"
                                label='דוא"ל'
                                value={newMember.email || ""}
                                input={"text"}
                                type='email'
                                email={true}
                            />
                        </div>
                        <div className='p-2 w-full text-right'>
                            <div className="items-center flex gap-x-2">
                                <Checkbox id="isAdmin" onCheckedChange={handleChecked} />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="isAdmin"
                                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        האם השותף מנהל/ת? </label>
                                </div>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex !justify-between'>
                    <AlertDialogCancel>ביטול</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>הוסף את השותף החדש</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
export default AddNewMember
