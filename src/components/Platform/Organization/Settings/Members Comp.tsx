'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {OrgSettingsType} from "@/components/Platform/Organization/Settings/Main Settings Comp";
import {useUsers} from "@/hooks/use-Users";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {toast} from "sonner";
import {updateOrganization} from "@/services/fetch";
import {useRouter} from "next/navigation";
import {Button} from '@/components/ui/button'
import {TrashIcon} from "@/components/Icons";
import {useSession} from "next-auth/react";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useOrganization} from "@/hooks/use-Organization";
import AddNewMember from "@/components/Platform/Organization/Settings/Add New Member";

const MembersComp = (props : OrgSettingsType) => {
    const { organization } = props
    const { users } = useUsers()
    const { onCreate} = useOrganization()
    const router = useRouter()
    const {data} = useSession()

    let organizationMembers = organization.members.map(memberEmail => {
        let findUser = users.find(user => user.email === memberEmail)
        let isAdmin = !!organization.admin?.includes(memberEmail)
        return {
            name : findUser?.fullName || "משתמש לא רשום",
            fName : findUser?.fName || "משתמש",
            lName : findUser?.lName  || "לא רשום",
            avatar : findUser?.avatar,
            email : memberEmail,
            role : isAdmin ? "admin" : "member"
        }
    })

    const handleChange = (value : string , email : string) => {
        if(value === "admin") {
            organization.admin = [...organization.members , email]
        } else {
            organization.admin = organization.members.filter(adminEmail => adminEmail !== email)
        }

        if(value === 'delete') {
            organization.admin = organization.admin.filter(member => member !== email)
            organization.members = organization.members.filter(member => member !== email)
        }

        toast.promise(updateOrganization(organization.slug , organization),
            {
                loading : "מעדכן פרטי השותף בארגון...",
                success : async () => {
                    router.refresh()
                    onCreate()
                    return 'הארגון התעדכן בהצלחה!'
                },
                error : (data) => {
                    return data.message
                }
            }
        )
    }

    return (
        <>
            <div>
                <AddNewMember organization={organization}/>
            </div>
            <Table dir='rtl'>
                <TableHeader>
                    <TableRow>
                        <TableHead  className='text-right'>משתמש</TableHead>
                        <TableHead className='text-center'>תפקיד</TableHead>
                        <TableHead className='text-center'>{'דוא"ל'}</TableHead>
                        <TableHead className='text-right'>מחיקה</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        organizationMembers.map((member , index) => {
                            let itsMe = member.email === data?.user.email.toLowerCase()
                            return <TableRow key={index}>
                                <TableCell className='flex gap-x-2 px-3'>
                                    <Avatar>
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.fName?.slice(0,1)}{member.lName?.slice(0,1)}</AvatarFallback>
                                    </Avatar>
                                    <p>{member?.name}</p>
                                </TableCell>
                                <TableCell className='px-1 text-center'>
                                    {
                                        itsMe ?
                                            <p>{member?.role === "admin" ? 'מנהל' : 'שותף'}</p> :
                                            <Select dir='rtl' defaultValue={member?.role} onValueChange={(e : string) => handleChange(e , member?.email!)}>
                                                <SelectTrigger className="w-[100px] mx-auto">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">מנהל</SelectItem>
                                                    <SelectItem value="member">שותף</SelectItem>
                                                </SelectContent>
                                            </Select>
                                    }
                                </TableCell>
                                <TableCell className='px-1 text-center'>
                                    <p>{member?.email}</p>
                                </TableCell>
                                <TableCell className='px-1 text-center'>
                                    {
                                        itsMe ? <p>-</p> :
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button variant='icon' className='text-red-600'>
                                                <TrashIcon fontSize={25}/>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='w-[400px]'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className='text-center mt-5 text-lg'>האם אתה בטוח שאתה רוצה להסיר את {member.name} מהארגון {organization.name}?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className='flex gap-x-4'>
                                                <AlertDialogAction onClick={() => handleChange('delete' , member.email!)} className='w-full text-lg bg-red-600 hover:bg-red-600/60'>כן</AlertDialogAction>
                                                <AlertDialogCancel className='w-full text-lg'>לא</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    }
                                </TableCell>
                            </TableRow>
                            }
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}
export default MembersComp
