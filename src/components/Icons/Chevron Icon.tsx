'use client'
import {IconsType} from "@/types/others";

const strokes = {
    success : 'stroke-green-600',
    error : 'stroke-red-600',
    warning : 'stroke-yellow-400',
    info : 'stroke-white'
}

type PositionType = "right" | "left" | "up" | "bottom";

const positions: { [key in PositionType]: JSX.Element } = {
    right: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>,
    left: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>,
    up: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>,
    bottom: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>,
};


const ChevronIcon = (props : IconsType) => {
    const {fontSize , color, position} = props

    const positionKey = position!.toLowerCase() as PositionType;

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{fontSize: `${fontSize}px`}}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            stroke='currentColor'
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            {positions[positionKey]}
        </svg>
    );
}
export default ChevronIcon
