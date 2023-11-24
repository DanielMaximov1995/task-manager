import React from 'react'
import dynamicNext from 'next/dynamic';
import RestrictedContent from '@/components/RestrictedContent';
const SignUpComp = dynamicNext(() => import('@/components/Platform/Auth/SignUp'))

export const dynamic = 'force-dynamic'

const SignUpPage = () => {

    return <>
        <p className='m-0 text-center font-semibold'>אנא הרשמו כדי להמשיך</p>
            <SignUpComp/>
        </>
}

export default SignUpPage
