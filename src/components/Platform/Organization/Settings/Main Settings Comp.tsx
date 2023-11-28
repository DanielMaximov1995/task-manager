'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {OrganizationModelType} from "@/types/Schema";
import MembersComp from "@/components/Platform/Organization/Settings/Members Comp";
import {useEffect, useState} from "react";
import {useUsers} from "@/hooks/use-Users";
import SettingsComp from "@/components/Platform/Organization/Settings/Settings Comp";

export type OrgSettingsType = {organization : OrganizationModelType}

type OptionsContent = {
    [key: string]: { title: string; subTitle: string };
};

const MainSettingsComp = (props : OrgSettingsType) => {
    const { organization } = props
    const { onCreateUsers } = useUsers()
    const [tabValue, setTabValue] = useState<string>("members");


    useEffect(() => {
        onCreateUsers()
    },[])

    const optionsContent : OptionsContent = {
        settings : { title : "הגדרות" , subTitle : "נהל את הגדרות הארגון" },
        members : { title : "שותפים" , subTitle : "נהל וצפה בשותפי הארגון" },
    }

    return (
        <div className='w-full'>
            <p className='text-3xl font-semibold'>{optionsContent[tabValue].title}</p>
            <p className='text-lg font-medium text-primary/60'>{optionsContent[tabValue].subTitle}</p>
            <Tabs defaultValue={tabValue} className="flex w-full flex-col justify-center py-5" dir='rtl'>
                <div className='flex w-full justify-center'>
                    <TabsList className='p-4 w-full'>
                        <TabsTrigger onClick={() => setTabValue("members")} className='text-xl m-1 p-1 px-4' value="members">שותפים</TabsTrigger>
                        <TabsTrigger onClick={() => setTabValue("settings")} className='text-xl m-1 p-1 px-4' value="settings">הגדרות</TabsTrigger>
                    </TabsList>
                </div>
                <section className="w-full md:w-[600px] mx-auto">
                <TabsContent value="members">
                    <MembersComp organization={organization}/>
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsComp organization={organization}/>
                </TabsContent>
                </section>
            </Tabs>
        </div>
    )
}
export default MainSettingsComp
