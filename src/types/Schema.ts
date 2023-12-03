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

    createdAt?: Date;
    updatedAt?: Date;
}

export type OrganizationModelType = {
    _id?: ObjectIdType;
    slug : string;
    imageUrl : string;
    name : string;
    admin ?: string[];
    members : string[];

    createdAt?: Date;
    updatedAt?: Date;
}

export type BoardModelType = {
    _id?: ObjectIdType;
    orgId : string;
    title : string;
    imageThumbUrl : string;
    imageFullUrl : string;
    imageLinkHTML : string;

    createdAt?: Date;
    updatedAt?: Date;
}

export type CardModelType = {
    _id?: ObjectIdType;
    listId ?: string;
    title : string;
    order ?: number;
    description ?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export type ListModelType = {
    _id?: ObjectIdType;
    boardId : string;
    title : string;
    order ?: number;
    cards ?: CardModelType[];

    createdAt?: Date;
    updatedAt?: Date;
}

export type LogModelType = {
    _id?: ObjectIdType;
    user : UserModelType;
    board ?: BoardModelType;
    organization ?: OrganizationModelType;
    list ?: ListModelType;
    action : string;
    type : "delete" | "add" | "update"
    model : "board" | "organization" | "list"
    orgId : string;

    createdAt?: Date;
    updatedAt?: Date;
}