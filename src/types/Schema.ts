import {Types} from "mongoose";

export type ObjectIdType = Types.ObjectId | string | undefined;

export type UserModelType = {
    _id?: ObjectIdType;
    fName : string;
    lName ?: string;
    fullName ?: string;
    email : string,
    password : string,
    phone ?: string,
    orgId ?: string,
    avatar ?: string
}

export type OrganizationModelType = {
    _id?: ObjectIdType;
    slug : string;
    imageUrl : string;
    name : string;
    admin ?: string[];
    members : string[];
}