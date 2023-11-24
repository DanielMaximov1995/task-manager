export const createSlug = (str : string) => {
    return str.toLowerCase()
        .replace(/[^a-zA-Z0-9א-ת]+/g, '-') // Replace non-alphanumeric Hebrew characters with hyphens
        .replace(/-{2,}/g, '-')
}