'use client'

import SelectOrg from "@/components/Platform/Auth/Organization/Select-Org";

const SelectOrgPage = () => {
    return (
        <>
            <p className='m-0 text-center font-semibold'>בחר ארגון כדי להמשיך</p>
            <SelectOrg/>
        </>
    )
}
export default SelectOrgPage
