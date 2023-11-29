'use client'
import { Button } from "@/components/ui/button"
import {CardModalProp} from "@/components/Platform/Board/List/Card/Card Modal/Index Card Modal";

const CardActions = (props : CardModalProp) => {
    return (
        <>
            <Button> שכפול</Button>
            <Button>מחיקה</Button>
        </>
    )
}
export default CardActions
