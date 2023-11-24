import React from 'react'
import dynamicNext from 'next/dynamic';
import Logo from "@/components/Logo";
import RestrictedContent from '@/components/RestrictedContent';
const SignInComp = dynamicNext(() => import('@/components/Platform/Auth/SignIn'))

export const dynamic = 'force-dynamic'

const SignInPage = () => {

    return <>
        <p className='m-0 text-center font-semibold'>התחברו כדי להמשיך</p>
            <SignInComp/>
        </>
}

export default SignInPage
