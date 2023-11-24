'use client'
import { Button } from '@/components/ui/button'
import {UserModelType} from "@/types/Schema";
import SingleImageDropzoneUsage from "@/components/Upload Files/Upload Picture";
import FloatLabelText from "@/components/Float Label Text";
import { useState , useEffect } from 'react'
import {CustomEvent, CustomEventTarget} from "@/types/others";
import { toast } from 'sonner';
import { updateUser} from "@/services/fetch";
import {useSession} from "next-auth/react";
import {useEdgeStore} from "@/utils/edgeStore";

const EditAccount = ({ user } : { user : UserModelType | null | undefined }) => {
    const [form, setForm] = useState<UserModelType>(user!);
    const { update } = useSession()
    const { edgestore } = useEdgeStore();

    const handleChange = (e: CustomEvent | CustomEventTarget) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        let updateData = {
            ...form,
            fullName : `${form.fName} ${form.lName}`
        }

        toast.promise(updateUser(user?._id , updateData),{
            loading : "מעדכן פרטים...",
            success : async () => {
                await update(updateData)
                if(updateData.avatar) {
                    await edgestore.publicFiles.confirmUpload({
                        url: updateData.avatar,
                    });
                }
                return "עודכן בהצלחה !"
            },
            error : (data) => {
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
                    handleChange={handleChange}
                    name="fName"
                    label='שם פרטי'
                    value={form?.fName || ""}
                    input={"text"}
                />
            </div>
            <div className="w-full md:w-1/2 p-2">
                <FloatLabelText
                    handleChange={handleChange}
                    name="lName"
                    label='שם משפחה'
                    value={form?.lName || ""}
                    input={"text"}
                />
            </div>
            <div className="w-full p-2">
                <Button onClick={handleSubmit} className='w-full text-lg'>שמירת פרטים אישיים</Button>
            </div>
        </div>
    )
}
export default EditAccount
