'use client'

import { PageAndLayoutType } from "@/types/others"
import { SessionProvider } from "next-auth/react"


const AuthProvider = (props : PageAndLayoutType) => {
    const { children } = props

  return <SessionProvider>
  {children}
</SessionProvider>
}

export default AuthProvider