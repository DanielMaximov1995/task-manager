import { UserModelType } from "./Schema";


declare module "next-auth" {

    interface Session {
        user: UserModelType
    }
}