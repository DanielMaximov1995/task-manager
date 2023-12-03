import dynamicNext from 'next/dynamic';
const SignInComp = dynamicNext(() => import('@/components/Platform/Auth/SignIn') , { ssr : false })

export const dynamic = 'force-dynamic'

const SignInPage = () => {

    return <>
        <p className='m-0 text-center font-semibold'>התחברו כדי להמשיך</p>
            <SignInComp/>
        </>
}

export default SignInPage
