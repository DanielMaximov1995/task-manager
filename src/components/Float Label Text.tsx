'use client'

import {CustomEvent} from "@/types/others";
import { InputHTMLAttributes, useState} from "react";

type FloatType = {
    handleChange?: (e: CustomEvent) => void;
    name?: string;
    label: string;
    value?: string | number;
    type?: string;
    input: "text" | "password" | "textarea";
    tel ?: boolean;
    email ?: boolean
    className ?: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

import { cn } from "@/utils/shadcn-utils"
import { VisibleIcon } from "./Icons";


const FloatLabelText = (props: FloatType) => {
    const {handleChange, label, name, value, className , type, input , tel , email , ...otherprops } = props
    const [showPass, setShowPass] = useState<boolean>(false);

    const options = {
        text : <input
            {...otherprops}
            id={name}
            name={name}
            value={value}
            type={type}
            placeholder=''
            onChange={handleChange}
            inputMode={tel ? 'tel' : email ? "email" : undefined}
            className={cn('input peer no-spinners', className)}
        />,
        password : <>
            <span className="absolute inset-y-0  left-0 flex items-center pl-2 text-3xl text-neutral-400">
                    <button onClick={() => setShowPass(prev => !prev)} type='button' className='pl-2'>
                          <VisibleIcon type={showPass} fontSize={20}/>
                    </button>
                </span>
            <input
                {...otherprops}
                id={name}
                name={name}
                type={showPass ? "text" : "password"}
                value={value}
                placeholder=''
                onChange={handleChange}
                className={cn('input peer' , className)}
            />
        </>,
        textarea : <textarea
                {...otherprops}
                id={name}
                name={name}
                value={value}
                placeholder=''
                onChange={handleChange}
                className={cn('input peer h-14 py-1' , className)}
            />
    }

    return (
        <div className='relative'>
            {options[input]}
            <label
                htmlFor={name}
                className='absolute right-2 -top-3 text-sm effect px-[1px] bg-white text-neutral-400 peer-focus:bg-white peer-focus:text-neutral-800 peer-focus:text-sm peer-focus:-top-3 md:peer-placeholder-shown:text-[18px] peer-placeholder-shown:bg-transparent peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-400'>
                {label}
            </label>
        </div>
    )
}
export default FloatLabelText
