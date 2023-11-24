import {ReactNode , ChangeEvent } from "react";

export type PageAndLayoutType = {
    children ?: ReactNode;
    params ?: { [key: string]: string };
    searchParams ?: { [key: string]: string };
    fullback ?: JSX.Element
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
        value: string;
        id?: string;
    };
};

export type PasswordEmailType = {
    email ?: string;
    oldPassword : string;
    newPassword ?: string;
    confirmNewPassword ?: string;
}