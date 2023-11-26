'use server'
import bcrypt from "bcryptjs"
import {ObjectIdType, OrganizationModelType, UserModelType} from "@/types/Schema"
import UserModel from "@/utils/Database/models/UserModel"
import {PasswordEmailType} from "@/types/others";
import OrganizationModel from "../utils/Database/models/OrganizationModel";
import {getServerSession , Session } from "next-auth";
import { authOptions } from '@/utils/authOptions'

export const getUsers =  async () => {
    try {
        let data = await UserModel.find()
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getUserId =  async (id : string) => {
    try {
        let data = await UserModel.findById(id)
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const addNewUser =  async (data : UserModelType) => {
    try {
        let emailExist = await UserModel.findOne({email : data.email.toLowerCase()})
        if(emailExist) {
            throw Error('אימייל זה קיים...')
        }

        let password = await bcrypt.hash(data.password, 10)

        const newUser = await UserModel.create({
            ...data,
            fullName : `${data.fName} ${data.lName}`,
            email : data.email.toLowerCase(),
            password
        });

        return JSON.parse(JSON.stringify({ newUser, message : 'ההרשמה בוצעה בהצלחה !' , success : true }))
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id : ObjectIdType , data: UserModelType) => {
    try {
        await UserModel.findOneAndUpdate({ _id: id }, data);
        return JSON.parse(JSON.stringify({ message : 'התעדכן בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const updateEmailOrPassword = async ( id : ObjectIdType , data: PasswordEmailType) => {
    try {
        let getUser = await UserModel.findById(id)

        if (!getUser) {
            throw new Error('משתמש זה לא קיים');
        }

        const isPasswordCorrect = bcrypt.compare(
            data.oldPassword,
            getUser.password
        );

        if(!isPasswordCorrect) {
            throw Error("הסיסמה שהקשת שגויה!")
        }

        if(data.email?.toLowerCase() !== getUser?.email?.toLowerCase()) {
            getUser.email = data.email
        }

        if(data.newPassword) {
            if(data?.newPassword && data?.confirmNewPassword) {
                getUser.password = await bcrypt.hash(data.newPassword, 10)
            }
        }

        const editUser = await UserModel.findOneAndUpdate({ _id: id }, getUser);
        return JSON.parse(JSON.stringify({ editUser, message : 'התעדכן בהצלחה' }));
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async ( email : string) => {
    try {
        let data = await UserModel.findOneAndDelete({email})
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        throw error;
    }
};

export const getAllOrganization = async () => {
    try {
        let data = await OrganizationModel.find()
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getOrganizationByEmail = async () => {
    try {
        const session : Session | null = await getServerSession(authOptions)
        let data = await OrganizationModel.find()
        let getByEmail = data.filter(org => org.members.includes(session?.user?.email))
        return JSON.parse(JSON.stringify(getByEmail))
    } catch (error) {
        throw error;
    }
}

export const getOrganizationSlug =  async (slug : string) => {
    try {
        let data = await OrganizationModel.findOne({slug})
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const addNewOrganization =  async (data : OrganizationModelType) => {
    try {
        const session : Session | null= await getServerSession(authOptions)

        if(!session) {
            throw Error('רק משתמש מחובר יכול להוסיף ארגון !' )
        }

        let findOrg = await OrganizationModel.findOne({slug : data.slug})
        if(findOrg) {
            throw Error('ארגון בשם הזה כבר קיים !' )
        }

        let newOrgData = {
            ...data,
            admin : [session?.user?.email.toLowerCase()],
            members : [...data?.members.map(email => email.toLowerCase()) , session?.user?.email.toLowerCase()]
        }

        let newOrg = await OrganizationModel.create({
            ...newOrgData,
            admin : Array.from(new Set<string>(newOrgData.admin)),
            members : Array.from(new Set<string>(newOrgData.members))
        });

        return JSON.parse(JSON.stringify({ newOrg , message : 'הארגון התווסף בהצלחה !' }))
    } catch (error) {
        throw error;
    }
}

export const updateOrganization = async (slug : string , data: OrganizationModelType) => {
    try {
        if(data.members.length === 0) {
            await OrganizationModel.findOneAndDelete({slug})
        }

        await OrganizationModel.findOneAndUpdate({ slug }, data);
        return JSON.parse(JSON.stringify({ message : 'התעדכן בהצלחה' }));
    } catch (err) {
        throw err;
    }
}