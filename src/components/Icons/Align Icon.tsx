'use client'

import {IconsType} from "@/types/others";

const strokes = {
    success: 'stroke-green-600',
    error: 'stroke-red-600',
    warning: 'stroke-yellow-400',
    info: 'stroke-white'
}

type AlignTypeIcon = {
    align: "left" | "center" | "right" | "justify"
} & IconsType

const AlignIcon = (props: AlignTypeIcon) => {
    const {fontSize, color, align} = props

    const alignOptions = {
        left: <path d="M4 19h16v2H4zm0-4h11v2H4zm0-4h16v2H4zm0-8h16v2H4zm0 4h11v2H4z"></path>,
        center: <path d="M4 19h16v2H4zm3-4h10v2H7zm-3-4h16v2H4zm0-8h16v2H4zm3 4h10v2H7z"></path>,
        right: <path d="M4 19h16v2H4zm5-4h11v2H9zm-5-4h16v2H4zm0-8h16v2H4zm5 4h11v2H9z"></path>,
        justify: '',
    }


    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{fontSize: `${fontSize}px`}}
            stroke='none'
            fill="currentColor"
            strokeWidth="1.5"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {alignOptions[align]}
        </svg>
    );
}
export default AlignIcon
