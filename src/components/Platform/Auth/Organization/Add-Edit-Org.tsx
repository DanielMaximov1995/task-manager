'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {OrganizationModelType} from "@/types/Schema";
import {useState, useEffect, ChangeEvent} from 'react'
import {CustomEvent, CustomEventTarget, PageAndLayoutType} from "@/types/others";
import {createSlug} from "@/services/slugIt";
import { Button } from '@/components/ui/button'
import {addNewLog, addNewOrganization, updateOrganization} from "@/services/fetch";
import {useEdgeStore} from "@/utils/edgeStore";
import {toast} from "sonner";
import {Progress} from "@/components/ui/progress";
import {formatFileSize} from "@/components/Upload Files/Single Image Dropzone";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import FloatLabelTextArea from "@/components/Float Text/Float Label Text Area";
import FloatLabelText from "@/components/Float Text/Float Label Text";
import {useOrganization} from "@/hooks/use-Organization";

export type OrgPropsType = {organization ?: OrganizationModelType}

const AddEditOrg = (props : OrgPropsType) => {
    const { organization } = props
    const [org, setOrg] = useState<OrganizationModelType>({
        name : "",
        slug : "",
        imageUrl : "",
        members : []
    });
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState<number>(0);
    const router = useRouter()
    const { data : session } = useSession()
    const { onAddOrganization , onUpdateOrganization } = useOrganization()

    useEffect(() => {
        if(organization) {
           return  setOrg(organization)
        }
    },[])

    useEffect(() => {
        setOrg((prev) => ({
            ...prev,
            slug: createSlug(prev.name)
        }));
    }, [org.name]);

    const handleChange = (e: CustomEvent | CustomEventTarget) => {
        const {name, value} = e.target
        let currentValue = value

        if(name === "slug") {
            currentValue = createSlug(value)
        }

        if(name === "members") {
            value.replace(' ' , ",")
            currentValue = value.split(",").map((member : string) => member.trim())
        }

        setOrg(prev => ({
            ...prev,
            [name] : currentValue
        }))
    }

    const handleFile = async (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if(file.size >= 2097152) {
                return toast.error(`הקובץ גדול מדי. גודל מקסימלי הוא ${formatFileSize(2097152)}`)
            }

            const res = await edgestore.publicFiles.upload({
                file,
                options : {
                    temporary : true
                },
                onProgressChange: (progress) => {
                    setProgress(progress);
                },
            });
            handleChange({target : { name : "imageUrl" , value : res.url }})
        }
    }

    const handleRemoveFile = async () => {
        if(org.imageUrl) {
            handleChange({target : { name : "imageUrl" , value : "" }})
            await edgestore.publicFiles.delete({
                url: org.imageUrl,
            });
        }
    }

    const handleEditSubmit = () => {
        if(!org.name || !org.slug) {
            return toast.error("חובה לרשום שם עבור הארגון!")
        }

        toast.promise(updateOrganization(organization?.slug! , org),{
            loading : `מעדכן את ${org.name}...`,
            success : async (data) => {
                if(org.imageUrl && org.imageUrl !== organization?.imageUrl) {
                    await edgestore.publicFiles.confirmUpload({
                        url: org.imageUrl,
                    });
                }
                    router.refresh()
                    onUpdateOrganization(organization?.slug! , org)
                    await addNewLog(`בוצע עדכון של המידע בארגון` , "update" , organization?._id?.toString()! , session?.user?._id?.toString()! , "organization" , organization?._id?.toString()!)
                router.push(`/org/${org.slug}/settings`)
                    return `${org.name} עודכן בהצלחה...`
            },
            error : (data) => {
                return data.message
            }
        })
    }

    const handleSubmit = async () => {
        if(!org.name || !org.slug) {
            return toast.error("חובה לרשום שם עבור הארגון!")
        }

        toast.promise(addNewOrganization(org),{
                loading : "מוסיף ארגון חדש...",
                success : async (data) => {
                    if(org.imageUrl) {
                        await edgestore.publicFiles.confirmUpload({
                            url: org.imageUrl,
                        });
                    }
                    onAddOrganization(data.newOrg)
                    router.push(`/org/${data.newOrg.slug}`)
                    return "הארגון התווסף בהצלחה !"
                },
                error : (data) => {
                    return data.message
                }
            })
    }

    return (
        <div className='flex flex-wrap'>
                <div className='p-2 py-4 gap-x-2 flex w-full'>
                    <Avatar className='mt-1'>
                        <AvatarImage className='bg-blue-500' src={org?.imageUrl}/>
                        <AvatarFallback>{org?.name.slice(0,1)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-wrap items-center'>
                        <span className={`text-neutral-400 ${org?.imageUrl && "hidden"}`}>תמונת ארגון (לא חובה)</span>
                        {
                            org.imageUrl ?
                                <span className='text-md w-full text-red-400 cursor-pointer' onClick={handleRemoveFile}>מחיקה תמונה</span>
                                : progress > 0 && progress !== 100 ?
                                    <Progress value={progress} className='m-2 h-2 w-1/2'/> : <label className='text-sm w-full text-sky-700 cursor-pointer'>
                                    <span>העלאת תמונה</span>
                                    <input type='file' accept={'image/*'} multiple={false} hidden onChange={handleFile}/>
                                </label>
                        }
                    </div>
                </div>
            <div className='p-2 w-full'>
                <FloatLabelText
                    onChange={handleChange}
                    name="name"
                    label="שם"
                    value={org.name || ""}
                />
            </div>
            <div className='p-2 w-full'>
                <FloatLabelText
                    onChange={handleChange}
                    name="slug"
                    label="מטא קישור"
                    value={org.slug || ""}
                />
            </div>
            {!!organization ? null :
                <>
                    <div className='p-2 w-full'>
                        <FloatLabelTextArea
                            onChange={handleChange}
                            name="members"
                            label="שותפים"
                            value={org.members.join(",") || ""}
                            className='text-sm'
                        />
                    </div>

                </>
             }
            {
                !!organization ?
                    <div className='w-full p-2'>
                        <Button className='w-full text-lg' onClick={handleEditSubmit}>שמירת פרטי הארגון</Button>
                    </div> : <div className='w-full p-2'>
                <Button className='w-full text-lg' onClick={handleSubmit}>הקמת הארגון</Button>
</div>
            }
        </div>
    )
}
export default AddEditOrg
