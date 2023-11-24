'use client'
import {IconsType} from "@/types/others";

const strokes = {
    success: 'fill-green-600',
    error: 'fill-red-600',
    warning: 'fill-yellow-400',
    info: 'fill-white'
}

const TrashIcon = ({fontSize, color}: IconsType) => {

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{fontSize: `${fontSize}px`}}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            stroke="none"
            fill="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
                <path
                    d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
        </svg>
    );
};

export default TrashIcon
