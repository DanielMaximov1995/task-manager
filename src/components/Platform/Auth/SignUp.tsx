'use client'

import {useState , FormEvent} from "react";
import FloatLabelText from "@/components/Float Label Text";
import {CustomEvent} from "@/types/others";
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import { toast } from "sonner";
import { addNewUser } from "@/services/fetch";
import { signIn } from "next-auth/react";

type UserSignUp = {
    email: string;
    password: string;
    fName : string;
    lName : string;
}

const SignUp = () => {
    const [user, setUser] = useState<UserSignUp>({
        email: '',
        password: "",
        fName : "",
        lName : ""
    });

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target
        setUser(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault()
        toast.promise(addNewUser(user), {
            loading: 'כמה רגעים ותהיה חלק...',
            success: async (data) => {
                await signIn('credentials', {redirect: false, email: user.email, password: user.password})
              return `${user.fName} ברוך הבא !`;
            },
            error: (data) => {
                return data.message;
            },
          })
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-wrap'>
            <div className='w-full p-2'>
                <FloatLabelText
                    handleChange={handleChange}
                    name="fName"
                    label='שם פרטי'
                    value={user.fName || ""}
                    input={"text"}
                />
            </div>
            <div className='w-full p-2'>
                <FloatLabelText
                    handleChange={handleChange}
                    name="lName"
                    label='שם משפחה'
                    value={user.lName || ""}
                    input={"text"}
                />
            </div>
            <div className='w-full p-2'>
                <FloatLabelText
                    handleChange={handleChange}
                    name="email"
                    label='דוא"ל'
                    value={user.email || ""}
                    input={"text"}
                />
            </div>
            <div className='w-full p-2'>
                <FloatLabelText
                    handleChange={handleChange}
                    name="password"
                    label='סיסמה'
                    value={user.password || ""}
                    input={"password"}
                />
            </div>
            <div className="w-full p-2">
                <Button className='w-full text-xl'>הרשמה</Button>
            </div>
            <div className="w-full flex justify-end items-center px-2">
                <Link className="text-blue-500 font-semibold tracking-wider hover:tracking-widest hover:text-blue-700 effect" href='/sign-in'>חשבון קיים? לחץ כאן</Link>
            </div>
        </form>
    )
}
export default SignUp
