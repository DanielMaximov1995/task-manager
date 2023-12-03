'use client'

import {useState , FormEvent} from "react";
import FloatLabelText from "@/components/Float Label Text";
import {CustomEvent} from "@/types/others";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { toast } from 'sonner';
import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";

type UserLogin = {
    email: string;
    password: string
}

const SignIn = () => {
    const [user, setUser] = useState<UserLogin>({
        email: '',
        password: ""
    });
    const router = useRouter()
    let lastOrg = typeof window !== 'undefined' ? localStorage.getItem('orgId') : null;

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target
        setUser(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()

        toast.promise(signIn('credentials' , { redirect : false , email : user.email , password : user.password }),{
            loading : "מתחבר למשתמש...",
            success : async () => {
                lastOrg? router.push(`/org/${lastOrg}`) : router.push('org')
                return "החיבור בוצעה בהצלחה !"
            },
            error : "אימייל/סיסמה שגויים!"
        })

    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-wrap'>
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
                <Button className='w-full text-xl'>התחברות</Button>
            </div>
            <div className="w-full flex justify-between items-center px-2">
                <Link className="text-blue-500 font-semibold tracking-wider hover:tracking-widest hover:text-blue-700 effect" href='/sign-up'>אין חשבון?</Link>
                <Link className="text-blue-500 font-semibold tracking-wider hover:tracking-widest hover:text-blue-700 effect" href='/forgot-password'>שכחת סיסמה?</Link>
            </div>
        </form>
    )
}
export default SignIn
