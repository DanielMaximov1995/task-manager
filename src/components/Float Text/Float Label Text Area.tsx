'use client'

import {forwardRef, InputHTMLAttributes} from "react";
import {CustomEvent} from "@/types/others";
import {cn} from "@/utils/shadcn-utils";

type FloatType = {
    name?: string;
    label: string;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

const FloatLabelTextArea = forwardRef<HTMLTextAreaElement , FloatType>((props, ref) => {
    const { label , name, className, ...other } = props

    other.placeholder = ""

    return (
        <div className='relative'>
            <textarea
                name={name}
                {...other}
                className={cn('input peer h-14 py-1 resize-none w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 shadow-sm' , className)}
            />
            <label
                htmlFor={name}
                className='absolute right-2 -top-3 text-sm effect px-[1px] bg-white text-neutral-400 peer-focus:bg-white peer-focus:text-neutral-800 peer-focus:text-sm peer-focus:-top-3 md:peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:top-1 peer-placeholder-shown:text-neutral-400'>
                {label}
            </label>
        </div>
    );
});
export default FloatLabelTextArea

FloatLabelTextArea.displayName = "FloatLabelTextArea"

