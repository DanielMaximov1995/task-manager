'use client'

export const createSlug = (str : string) => {
    let string = str.toLowerCase()
        .replace(/[^a-zA-Z0-9א-ת]+/g, '-')
        .replace(/-{2,}/g, '-')
    let newStr
    let slippedStr = string.split('-')
    if(slippedStr[slippedStr.length -1] === '') {
        newStr = string.slice(0, -1)
    } else {
        newStr = string
    }

    return newStr
}