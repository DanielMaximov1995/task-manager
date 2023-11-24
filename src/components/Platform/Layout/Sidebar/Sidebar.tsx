'use client'
import { useLocalStorage } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {Accordion} from "@/components/ui/accordion";

type SideBarProps = {
    storageKey ?: string;
}

const Sidebar = (props : SideBarProps) => {
    const { storageKey = "t-sidebar-state" } = props
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey , {})

    const defaultAccordionValue : string[] = Object.keys(expanded).reduce((acc : string[] , key : string) => {
        if(expanded[key]) {
            acc.push(key)
        }
        return acc
    },[])

    const onExpanded = (id : string) => {
        setExpanded((curr) => ({
            ...curr,
            [id] : !expanded[id]
        }))
    }

    return (
        <>
            <div className='font-medium text-xs flex items-center mb-1'>
                <span className='pr-4'>חללי עבודה</span>
                <Button
                asChild
                type='button'
                size='icon'
                variant='ghost'
                className='mr-auto'
                >
                    <Link href='/select-org'>
                        +
                    </Link>
                </Button>
            </div>
            <Accordion
            type='multiple'
            defaultValue={defaultAccordionValue}
            className='apace-y-2'
            >

            </Accordion>
        </>
    )
}
export default Sidebar
