'use client'
import {Button} from '@/components/ui/button'
import {UserModelType} from "@/types/Schema";
import SingleImageDropzoneUsage from "@/components/Upload Files/Upload Picture";
import {useState} from 'react'
import {CustomEvent, CustomEventTarget} from "@/types/others";
import {toast} from 'sonner';
import {updateUser} from "@/services/fetch";
import {useSession} from "next-auth/react";
import {useEdgeStore} from "@/utils/edgeStore";
import {useRouter} from "next/navigation";
import {useUsers} from "@/hooks/use-Users";
import FloatLabelText from "@/components/Float Text/Float Label Text";

const EditAccount = ({user}: { user: UserModelType | null | undefined }) => {
    const [form, setForm] = useState<UserModelType>(user!);
    const {update} = useSession()
    const {edgestore} = useEdgeStore();
    const {onCreateUsers} = useUsers()
    const router = useRouter()

    const handleChange = (e: CustomEvent | CustomEventTarget) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        let updateData = {
            ...form,
            fullName: `${form.fName} ${form.lName}`
        }

        toast.promise(updateUser(user?._id, updateData), {
            loading: "מעדכן פרטים...",
            success: async () => {
                onCreateUsers()
                await update(updateData)
                if (updateData.avatar) {
                    await edgestore.publicFiles.confirmUpload({
                        url: updateData.avatar,
                    });
                }
                return "עודכן בהצלחה !"
            },
            error: (data) => {
                return data.message
            }
        })
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full p-2">
                <SingleImageDropzoneUsage urlFile={form?.avatar} handleChange={handleChange}/>
            </div>
            <div className="w-full md:w-1/2 p-2">
                <FloatLabelText
                    onChange={handleChange}
                    name="fName"
                    label='שם פרטי'
                    value={form?.fName || ""}
                />
            </div>
            <div className="w-full md:w-1/2 p-2">
                <FloatLabelText
                    onChange={handleChange}
                    name="lName"
                    label='שם משפחה'
                    value={form?.lName || ""}
                />
            </div>
            <div className="w-full p-2">
                <Button onClick={handleSubmit} className='w-full text-lg'>שמירת פרטים אישיים</Button>
            </div>
        </div>
    )
}
export default EditAccount
