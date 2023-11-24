import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/utils/Database/models/UserModel";
import {dbConnect} from "@/utils/Database/db";
import bcrypt from 'bcryptjs'

dbConnect()

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const user = await UserModel.findOne({ email: credentials?.email?.toLowerCase() });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if(!isPasswordCorrect) {
                            throw Error("אימייל/סיסמה שגויים!");
                        }

                        return user
                    }
                } catch (err: any) {
                    throw new Error("אימייל/סיסמה שגויים!");
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
        error: '/',
    },
    session: {
        strategy: 'jwt',
        jwt : true
    },
    callbacks: {
        async jwt({ token, user } : any) {
            return { ...token, ...user }
        },
        async session({ session, user, token } : any) {
            const email = session?.user?.email || token.email
            const getUser = await UserModel.findOne({ email });
            if (getUser) {
                getUser.password = ''
                session.user = getUser
            }
            return session
        },
        async signIn() {
            return true
        }
    },
};