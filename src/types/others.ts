import {ReactNode , ChangeEvent } from "react";
import {OrganizationModelType} from "@/types/Schema";

export type PageAndLayoutType = {
    children ?: ReactNode | JSX.Element;
    params ?: { [key: string]: string };
    searchParams ?: { [key: string]: string };
    fullback ?: JSX.Element;
    organizations ?: OrganizationModelType[]
}

export type IconsType = {
    color ?: "success" | "error" | "warning" | "info";
    fontSize ?: number;
    position ?: "right" | "left" | "up" | "bottom";
    type ?: boolean
}

export type CustomEventTarget = {
    target: {
        name: string;
        value: string;
        id?: string | undefined;
    };
};


export type CustomEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & {
    target?: {
        name: string;
        value: any;
        id?: string;
    };
};

export type PasswordEmailType = {
    email ?: string;
    oldPassword : string;
    newPassword ?: string;
    confirmNewPassword ?: string;
}