'use client';

import { useEdgeStore } from '@/utils/edgeStore';
import { useState } from 'react';
import {SingleImageDropzone} from "@/components/Upload Files/Single Image Dropzone";
import {CustomEventTarget} from "@/types/others";

type SingleImageProp = {
    handleChange: (e: CustomEventTarget) => void;
    urlFile ?: string;
}

const SingleImageDropzoneUsage = (props : SingleImageProp) => {
    const { handleChange , urlFile} = props
    const [progress, setProgress] = useState<number>();
    const { edgestore } = useEdgeStore();

    const handleChangeUrl = async (file : File | undefined) => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                options : {
                    temporary : true
                },
                onProgressChange: (progress) => {
                    setProgress(progress);
                },
            });
            handleChange({target : { name : "avatar" , value : res.url }})
        } else {
            if(urlFile) {
                handleChange({target : { name : "avatar" , value : "" }})
                await edgestore.publicFiles.delete({
                    url: urlFile,
                });
            }
        }
    }

    return (
        <div>
            <SingleImageDropzone
                width={200}
                height={200}
                progress={progress || 0}
                className='mx-auto my-2'
                value={urlFile}
                onChange={handleChangeUrl}
            />

            {
                urlFile &&
                <button
                    onClick={async () => {
                        await edgestore.publicFiles.confirmUpload({
                            url: urlFile,
                        });
                    }}
                >
                    שמור תמונה
                </button>
            }
        </div>
    );
}

export default SingleImageDropzoneUsage