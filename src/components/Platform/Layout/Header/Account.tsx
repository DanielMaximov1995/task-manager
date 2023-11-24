'use client'

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {SettingIcon} from "@/components/Icons";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UserModelType} from "@/types/Schema";
import EditAccount from "@/components/Platform/Layout/Header/Edit Account";
import Security from "@/components/Platform/Layout/Header/Security";

const Account = ({ user } : { user : UserModelType | null | undefined }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex items-center my-6 gap-x-8 hover:bg-transparent px-4'>
                    <span className='text-gray-500'><SettingIcon fontSize={20}/></span>
                    <span className='text-lg font-normal'>ניהול משתמש</span>
                </div>
            </DialogTrigger>
            <DialogContent className='h-[700px]'>
                <DialogHeader>
                    <DialogTitle className='text-center text-3xl'>{user?.fullName}</DialogTitle>
                    <Tabs defaultValue="account" className="flex flex-col justify-center py-5" dir='rtl'>
                        <div className='flex justify-center'>
                            <TabsList>
                                <TabsTrigger value="info">פרופיל</TabsTrigger>
                                <TabsTrigger value="security">אבטחה</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="info">
                            <EditAccount user={user}/>
                        </TabsContent>
                        <TabsContent value="security">
                            <Security user={user}/>
                        </TabsContent>
                    </Tabs>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default Account
