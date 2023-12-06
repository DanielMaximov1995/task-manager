'use client'

import {LogModelType, UserModelType} from "@/types/Schema";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import moment from 'moment-timezone';
import 'moment/locale/he';

type LogCardType = {
    log : LogModelType;
    user : UserModelType;
}

const LogCard = (props : LogCardType) => {
    const { log, user } = props
    const addType = log.type === "add"
    const updateType = log.type === "update"
    const deleteType = log.type === "delete"

    const formattedDate = (data : Date) => {
        moment.locale('he');
        return moment(data).tz('Asia/Jerusalem').format("HH:mm, DD-MM-YYYY");
    };

    if(addType) {
        return <div className='bg-green-100/25 border-green-500/60 border-[1px] rounded-md p-2 flex items-center gap-x-2'>
            <div>
                <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className='text-xl'>{user?.fName?.slice(0 , 1)} {user?.lName?.slice(0 , 1)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <p className='m-0'>{log.action}</p>
                <p className='m-0 text-sm'>{'ע"י'} {user?.fullName} • {formattedDate(log?.createdAt!)}</p>
            </div>
        </div>
    }

    if(updateType) {
        return <div className='bg-sky-100/25 border-sky-500/60 border-[1px] rounded-md p-2 flex items-center gap-x-2'>
            <div>
                <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.fName?.slice(0 , 1)} {user?.lName?.slice(0 , 1)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <p className='m-0'>{log.action}</p>
                <p className='m-0 text-sm'>{'ע"י'} {user?.fullName} • {formattedDate(log?.createdAt!)}</p>
            </div>
        </div>
    }

    if(deleteType) {
        return <div className='bg-red-100/25 border-red-500/60 border-[1px] rounded-md p-2 flex items-center gap-x-2'>
            <div>
                <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.fName?.slice(0 , 1)} {user?.lName?.slice(0 , 1)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <p className='m-0'>{log.action}</p>
                <p className='m-0 text-sm'>{'ע"י'} {user?.fullName} • {formattedDate(log?.createdAt!)}</p>
            </div>
        </div>
    }

    return null
}
export default LogCard
