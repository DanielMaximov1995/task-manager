'use client'
import { Button } from '@/components/ui/button'
import {UserModelType} from "@/types/Schema";
import {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {CustomEvent, CustomEventTarget, PasswordEmailType} from "@/types/others";
import FloatLabelText from "@/components/Float Label Text";
import {toast} from "sonner";
import { updateEmailOrPassword} from "@/services/fetch";

const Security = ({user}: { user: UserModelType | null | undefined }) => {
    const [form, setForm] = useState<PasswordEmailType>({
        email: user?.email,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const {update , data} = useSession()

    const handleChange = (e: CustomEvent | CustomEventTarget) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if(!form.oldPassword) {
            return toast.error('חובה לבצע אימות סיסמה')
        }

        if(form.newPassword !== form.confirmNewPassword) {
            return toast.error('הסיסמאות החדשות לא תואמות')
        }

        toast.promise(updateEmailOrPassword(user?._id , form),{
            loading : "מעדכן פרטי אבטחה...",
            success : async (data) => {
                await signOut({redirect : false})
                return  "עודכן בהצלחה, התחברו מחדש."
            },
            error : (data) => {
                return data.message
            }
        })
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full p-2">
                <FloatLabelText
                    handleChange={handleChange}
                    name="oldPassword"
                    label='סיסמה לאימות'
                    value={form?.oldPassword || ""}
                    input={"password"}
                />
            </div>
            <div className='w-full p-2'>
                <div className='p-2 border border-dashed'>
                    <p className='text-center text-xl font-semibold text-neutral-800'>שינוי דואר אלקטרוני</p>
                    <FloatLabelText
                        handleChange={handleChange}
                        name="email"
                        label='דוא"ל'
                        value={form?.email || ""}
                        input={"text"}
                        type="email"
                    />
                </div>
            </div>
            <div className='w-full p-2'>
                <div className='p-2 border border-dashed'>
                    <p className='text-center text-xl font-semibold text-neutral-800'>שינוי הסיסמה</p>
                    <div className='py-2'>
                        <FloatLabelText
                            handleChange={handleChange}
                            name="newPassword"
                            label='סיסמה חדשה'
                            value={form?.newPassword || ""}
                            input={"password"}
                        />
                    </div>
                    <div className='py-2'>
                    <FloatLabelText
                        handleChange={handleChange}
                        name="confirmNewPassword"
                        label='אימות סיסמה חדשה'
                        value={form?.confirmNewPassword || ""}
                        input={"password"}
                    />
                    </div>
                </div>
            </div>
            <div className='w-full p-2'>
                <p className='flex justify-center text-red-600 font-semibold'>עם לחיצה על השמירה - תנותקו מידית לחיבור מחדש.</p>
                <Button onClick={handleSubmit} className='w-full text-lg'>שמירת פרטי אבטחה</Button>
            </div>
        </div>
    )
}
export default Security
